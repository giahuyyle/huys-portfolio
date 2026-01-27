import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGODB_URI;

let client;
let db;

export async function connectMongo() {
  if (db) return db; // already connected

  console.log("Connecting to MongoDB...");

  client = new MongoClient(uri);
  await client.connect();
  db = client.db(process.env.MONGO_DB_NAME || "portfolio");

    console.log("Connected to MongoDB.");

  return db;
}

export function getDb() {
  if (!db) throw new Error("MongoDB not connected. Call connectMongo() first.");
  return db;
}

export async function closeMongo() {
  if (client) await client.close();
  client = undefined;
  db = undefined;
}
