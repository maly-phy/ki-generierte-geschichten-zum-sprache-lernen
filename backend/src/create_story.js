import AsyncOpenAI from "openai";
import dotenv from "dotenv";
import path from "path";
import {openConfig} from "./create_database.js";

const config= await openConfig();
const model = config.chat_gwdg.model;

async function chatAuth(envPath= "../.env") {
    dotenv.config({
        path: path.resolve(envPath)
    });
    const api_key= process.env.API_KEY;
    const api_endpoint= process.env.API_ENDPOINT;
    const client = new AsyncOpenAI({apiKey: api_key, baseURL: api_endpoint});
    return client;
}

const client= await chatAuth();

export async function generateStory(germanWords) {
    const systemPrompt= "You are a helpful assistant, which generates short stories in German for language learners.";
    const wordsList = Array.isArray(germanWords) ? germanWords.join(", ") : germanWords;
    const userPrompt = `You will be given a list of German words. Your task is to generate a short story in German that incorporates all of the given words. Please consider the following in the generated story:
1- The story should be simple, engaging, and suitable for beginners learning German.
2- The story should be written in a clear and easy-to-understand manner.
3- please ensure that the story is coherent and flows naturally, with a clear beginning, middle, and end.
4- The story must be a maximum of five sentences and must include all given words.
5- Please return the generated story in a single paragraph without English translations, explanations, or additional text.

Here are the list of German words to be included in the story:
${wordsList}

Your generated story:

`;
    let resp= await client.chat.completions.create({
        model: model,
        messages: [
            {"role": "system", "content": systemPrompt},
            {"role": "user", "content": userPrompt}
        ],
        stream: false
    })
    resp= resp.choices[0].message.content
    return resp
}


// const germanWords= ["Haus", "Katze", "Baum", "Kind", "gerne"];
// const resp= await generateStory(germanWords);
// console.log(resp);
