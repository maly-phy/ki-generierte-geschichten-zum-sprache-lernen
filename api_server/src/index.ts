//@ts-nocheck
import { Hono } from "hono"
import {cors} from "hono/cors";
import {pbFetch, pbFetchTranslation} from "../../backend/src/create_database.js";
import {generateStory} from "../../backend/src/create_story.js";
import dotenv from "dotenv";

const app = new Hono()

app.use("*", cors()); // only during Dev

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post('/story', async (c) => {
  try {
    const body = await c.req.json();
    const offsetWords= body.offsetWords ?? [];
    const words = await pbFetch(offsetWords);
    const story= await generateStory(words);
    return c.json({words, story });

  } catch (err) {
    console.error(err);
    return c.json({error: err instanceof Error ? err.message : String(err)}, 500);
  }
});

app.get("/translate/:word", async (c) => {
  const word= c.req.param("word");
  try {
    const record= await pbFetchTranslation(word);
    if (record) {
      return c.json({
        english: record.english,
      });
    } else {return c.json({error: "Word not found"}, 404); }
  } catch (err) {
      console.error(err);
      return c.json({error: err instanceof Error ? err.message : String(err)}, 500);
  }
})

export default app
