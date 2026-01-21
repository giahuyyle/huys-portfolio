import { getDb } from "../db/mongo.js";
import { ObjectId } from "mongodb";

export async function getItems(filter = {}) {
    // database and collection instances
    const database = getDb();
    const itemsCollection = database.collection("items");

    // get all items
    const items = await itemsCollection.find(filter).toArray();
    // normalize ids
    return items.map(({ _id, ...rest }) => ({ id: _id?.toString?.(), ...rest }));
};

export async function getItemById(id) {
  const db = getDb();
  const col = db.collection("items");

  // try find by string id field first
  let doc = await col.findOne({ id });
  if (!doc) {
    // fallback to ObjectId if valid
    if (ObjectId.isValid(id)) {
      doc = await col.findOne({ _id: new ObjectId(id) });
    }
  }
  if (!doc) return null;
  const { _id, ...rest } = doc;
  return { id: _id?.toString?.() || id, ...rest };
}