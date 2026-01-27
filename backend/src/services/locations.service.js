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

  console.log(`[locations.service] fetched ${docs.length} locations from database with filter:`, filter);
  
  return docs.map(normalize);
}