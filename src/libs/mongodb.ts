export const runtime = "nodejs"

import mongoose from "mongoose";


export default async function connectMongoDB() {
    const MONGO_URI = process.env.MONGODB_URL;
    if (!MONGO_URI) {
        console.error("MONGODB_URL environment variable is not set.");
        throw new Error("MONGODB_URL environment variable is not set.");
    }

    try {
        const client = await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB");
        return client;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
};
