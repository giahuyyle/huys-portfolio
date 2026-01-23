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

export async function getItemByKey(key) {
  const db = getDb();
  const col = db.collection("items");

  // find by custom key field
  const doc = await col.findOne({ key });
  if (!doc) return null;

  const { _id, ...rest } = doc;
  return {
    id: _id?.toString?.(),
    key,
    ...rest,
  };
}