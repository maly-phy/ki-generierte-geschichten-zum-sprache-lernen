import {fileURLToPath} from 'url';
import { getPocketBase, pbAuth } from './create_database';

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

async function pbSort() {
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


if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const {pb, config} = await getPocketBase();
    await pbAuth(pb);
    await pbFill();
    await pbSort();
}