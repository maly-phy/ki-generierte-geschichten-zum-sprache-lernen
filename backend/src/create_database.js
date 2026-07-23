//@ts-nocheck
import PocketBase from "pocketbase";
import fs from "fs";
import csv from "csv-parser";
import dotenv from "dotenv";
import toml from "toml";
import path from "node:path";
import { fileURLToPath } from "url";
import {generateTranslation} from "./create_story.js";

dotenv.config();

export async function openConfig(file="../../config.toml") {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const configPath = path.resolve(__dirname, file);
    const config = toml.parse(fs.readFileSync(configPath, "utf8"));
    return config;
}

export async function getPocketBase(file="../../config.toml") {
    const config = await openConfig(file);
    const pb = new PocketBase(config.pocketbase.url);
    pb.autoCancellation(false);
    return {pb, config};
}
const {pb, config} = await getPocketBase();

async function mapRecords() {
    let allRecords= null;
    let map = null;
    if (!allRecords || !map) {
        allRecords= await pb.collection(config.pocketbase.collection).getFullList({});
        map = new Map(
            allRecords.map(r=> [r.german.toLowerCase(), r])
        )
    }
    return {allRecords, map};
};

let authenticated = false;

async function pbAuth(envPath="../.env") {
    dotenv.config({
        path: path.resolve(envPath)
    });
    const email = process.env.PB_EMAIL;
    const password = process.env.PB_PASSWORD;
    await pb.collection("_superusers").authWithPassword(
        email, password
        );
        authenticated=true;
};

// console.log("authenticated", authenticated);
if (!authenticated) {
    await pbAuth();
};

async function pbFill() {
    const rows = [];
    await new Promise((resolve, reject) => {;
        fs.createReadStream(config.pocketbase.data_file)
            .pipe(csv())
            .on("data", (data) => rows.push(data))
            .on("end", resolve)
            .on("error", reject);
    });
    
    for (const row of rows) {
        await pb.collection(config.pocketbase.collection).create({
            vocab_id: row.vocab_id,
            german: row.german,
            english: row.english,
        });
        console.log(`Inserted ${row.vocab_id}`);
    }
    console.log("All rows inserted successfully.");
} 

async function dbSort() {
    const records = await pb.collection(config.pocketbase.collection).getFullList({
        sort: "vocab_id"
    });
    for (let i=0; i< records.length; i++) {
        await pb.collection(config.pocketbase.collection).update(records[i].id, {
            vocab_id: i+1
        });
        console.log(`Updated ${records[i].vocab_id} to ${i+1}`);
    }
    console.log("All vocab_id updated successfully.");
}

export async function pbFetch(offsetWords = []) {
    const {allRecords, map} = await mapRecords();
    let offsetIds= []

    if (offsetWords.length === 0) {
        const firstRecord= allRecords.find(r => r.vocab_id === 1);
        if (firstRecord) {
            offsetWords.push(firstRecord.german);
        };
    }
    for (const word of offsetWords) {
        const wordCleaned = word
            .replace(",", "")
            .replace(".", "")
            .trim()
            .toLowerCase();

        const record= map.get(wordCleaned);
        if (record) {
            offsetIds.push(record.vocab_id);
        } else {
            console.error(`No record found for word "${word}"`);
        }
    };
    
    offsetIds.sort((a, b) => a-b);
    if (offsetIds.length < 5) {
        let lastOffset= offsetIds[offsetIds.length -1];
        while (offsetIds.length < 5) {
            lastOffset +=1;
            offsetIds.push(lastOffset);
        }
    }
    const filteredRecords= offsetIds.map(id => {
        const record= allRecords.find(r => r.vocab_id === id);
        return record ? record.german : null;
    })
    return filteredRecords.filter(r => r !== null);
};

export async function pbFetchTranslation(word) {
    const {allRecords, map } = await mapRecords();
    const wordCleaned= word.replace(",", "").replace(".","").trim().toLowerCase();
    const record = map.get(wordCleaned);
    
    if (record && record.example_english !== "" && record.example_german !== "") {
        return record;
    }
    const response= await generateTranslation(wordCleaned);
    const wordEnglish= response.translation;
    const exampleGerman= response.example_sentence_german;
    const exampleEnglish= response.example_sentence_english;
    const newRecord= {
        english: wordEnglish,
        example_german: exampleGerman,
        example_english: exampleEnglish
    }

    if (record) {
        await pb.collection(config.pocketbase.collection).update(record.id, newRecord);
        console.log(`Updated record for word "${wordCleaned}"`);
        return newRecord;
    } 
    else if (!record) {
        await pb.collection(config.pocketbase.collection).create({
            vocab_id: allRecords.length +1,
            german: wordCleaned,
            ...newRecord
        });
        console.log(`Created new record for word "${wordCleaned}"`);
        return newRecord;
    } 
    else {
        console.error(`No translation generated for word "${wordCleaned}"`);
        return null;
    }
};

export async function storeUserData(offsetWords, story, userRecordId) {
    if (offsetWords.length === 0 && story === "") {
        return null;
    } else {
        return await pb.collection(config.users_data.collection).create({
            offset_words: offsetWords,
            generated_story: story,
            user: userRecordId,
        })
    }
};

export async function loadUserData(userRecordId) {
    const record = await pb.collection(config.users_data.collection).getFullList({
        filter: `user = "${userRecordId}"`,
        sort: "-created",
        expand: "user"
    })
    return record[0] || null;
}

export async function registerUser(email, password, passwordConfirm) {
    await pb.collection(config.users.collection).create({
        email,
        password,
        passwordConfirm
    });
    return await pb.collection(config.users.collection).requestVerification(email);
}

export async function loginUser(email, password) {
    return await pb.collection(config.users.collection).authWithPassword(email, password);
}
