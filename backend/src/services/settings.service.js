import { getDb } from "../db/mongo.js";

function normalize(doc) {
  if (!doc) return null;
  const { _id, ...rest } = doc;
  return { id: _id?.toString?.(), ...rest };
}

export async function getSettings() {
  const db = getDb();
  const settings = await db.collection("settings").findOne({});
  return normalize(settings) || {};
}