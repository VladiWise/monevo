import mongoose from "mongoose";


export default async function connectMongoDB () {
    const url = process.env.LOCAL_MONGODB_URL;
    if (!url) {
        console.error("LOCAL_MONGODB_URL environment variable is not set.");
        throw new Error("LOCAL_MONGODB_URL environment variable is not set.");    
    }
    
    try {
        await mongoose.connect(url);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};
