//@ts-nocheck
import { Hono } from "hono"
import { setCookie, deleteCookie } from "hono/cookie";
import {cors} from "hono/cors";
import {pbFetch, pbFetchTranslation, registerUser, loginUser, verifyUser, getPocketBase} from "../../backend/src/create_database.js";
import {generateStory} from "../../backend/src/create_story.js";
import dotenv from "dotenv";

const app = new Hono()

app.use(
  "*", 
  cors({origin: "http://localhost:5173", credentials: true}),
); // only during Dev

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post('/api/story', async (c) => {
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

app.get("/api/translate/:word", async (c) => {
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

app.post("/api/register", async (c) => {
  const {email, password, passwordConfirm} = await c.req.json();
  if (password !== passwordConfirm) {
    return c.json({success: false, error: "Passwords do not match"}, 400);
  }
  try {
    await registerUser(email, password, passwordConfirm);
    return c.json({
      success: true,
    });
  } catch (err) {
    console.error(err);
    return c.json({success: false, error: err.message || "Registration failed"}, 400);
  }
});

app.post("/api/login", async(c) => {
  const {email, password} = await c.req.json();
  try {
    const authData = await loginUser(email, password);
    if (authData && authData.record.verified === true) {
      setCookie(c, "session", authData.token, {
        httpOnly: true,
        sameSite: "Lax", // Set to "Strict" in production
        secure: false, // Set to true in production
        path: "/",
        maxAge: 60 * 60 * 24, // 1 day
      });

      return c.json({
        success: true,
        token: authData.token,
        user: authData.record
      })
    } else if (authData && authData.record.verified === false) {
      return c.json({
        success: false,
        error: "User not verified. Please check your email for verification link."
      }, 403);
    }
  } catch(err) {
    return c.json({
      success: false,
      error: err.message || "Invalid credentials, Please check your email and password."
    }, 401);
  }
});

app.post("/api/logout", async (c) => {
  try {
    const {pb, _} = await getPocketBase("../../config.toml");
    pb.authStore.clear();
    deleteCookie(c, 'session', {
      path: '/'
    });
    return c.json({success: true});
  } catch (err) {
    console.error(err);
    return c.json({success: false, error: err.message || "Failed to logout"}, 500);
  }
});

export default app
