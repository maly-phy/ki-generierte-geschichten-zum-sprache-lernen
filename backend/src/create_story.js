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

export async function generateTranslation(germanWord) {
    const systemPrompt= "You are a helpful assistant, who translates German words into English and gives an illustrating example in German and English.";
    const userPrompt = `You will be given a German word. Your task is to provide the English translation of the word, along with the following information:
1- The type of the german word (noun, verb, adjective, etc.). 
  - If the word is noun then please additionally mention if it is singular (masculine, feminine, neuter) or plural (feminine). For example the word "Haus" (noun, singular, neuter), "Freunden" (noun, plural, feminine).
  - If the word is not a noun, then please specify its type only and leave the other type specifications empty. For example the word "laufen" (verb, "", ""), "schnell" (adjective, "", ""), "gestern" (adverb, "", "").
2- The article of the german word if it is a noun. The singular noun takes (der, die or das), while the plural noun takes (die). If it is not a noun, then please leave the article field as empty string.
3- An example sentence in both German and English that illustrates the meaning of the word.

Please consider the following instructions for your response:
1- The translation should be accurate and appropriate for the given German word.
2- The example sentence should be clear, concise, and relevant to the meaning of the word.
3- Please ensure that the example sentence is grammatically correct in both German and English.
4- Please return your response strictly in JSON format, without any additional text or explanations.

Here is the German word to be translated:
${germanWord}

Your response should be in the following JSON format:
{
    "translation": "English translation of the German word",
    "german_word_type": ["Type of the German word (noun, verb, adjective, etc.), singular, plural or '', specific type if it is a noun (singular -> masculine, feminine or neuter | plural -> feminine), or ''"],
    "german_word_article": "Article of the German word if it is a noun (singular -> der, die, das | plural -> die), or ''",
    "example_sentence_german": "Example sentence in German using the given word",
    "example_sentence_english": "English translation of the example sentence"
}
`;
    let resp = await client.chat.completions.create({
        model: model,
        messages: [
            {"role": "system", "content": systemPrompt},
            {"role": "user", "content": userPrompt}
        ],
        stream: false
    });
    resp = resp.choices[0].message.content;
    return JSON.parse(resp);
}

// const test= ["verb", "", "masculin"]
// const test2 = test.filter((w) => w !== "");
// console.log(test2.join(", ")); // Output: ["verb"]