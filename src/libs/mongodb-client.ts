// lib/mongodb-client.ts (For NextAuth MongoDB Adapter)
import { MongoClient } from "mongodb";

const MONGO_URI = process.env.LOCAL_MONGODB_URL as string;

if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable inside .env.local");
}

const options = {};
const client = new MongoClient(MONGO_URI, options);
const clientPromise = client.connect();

export default clientPromise;
