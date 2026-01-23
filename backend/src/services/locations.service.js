import { getDb } from "../db/mongo.js";

function normalize(doc) {
  if (!doc) return null;
  const { _id, ...rest } = doc;
  return { id: _id?.toString?.(), ...rest };
}

export async function getLocations(filter = {}) {
  const db = getDb();
  const col = db.collection("locations");
  const docs = await col.find(filter).toArray();
  return docs.map(normalize);
}