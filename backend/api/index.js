import app from "../src/app.js";
import dotenv from "dotenv";
import { connectMongo } from "../src/db/mongo.js";

if (process.env.NODE_ENV !== "production") dotenv.config();

let mongoReady = false;
async function ensureMongo() {
  if (mongoReady) return;
  await connectMongo();
  mongoReady = true;
}

// Ensure DB is ready before requests
app.use(async (req, res, next) => {
  await ensureMongo();
  next();
});

export default app;