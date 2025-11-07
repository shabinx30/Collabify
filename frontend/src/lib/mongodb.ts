import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) throw new Error("Missing MONGODB_URI environment variable");

let connectionPromise: Promise<typeof mongoose> | null = null;

async function connectDB() {
    if (mongoose.connection.readyState >= 1) return mongoose;
    if (!connectionPromise) {
        connectionPromise = mongoose.connect(MONGODB_URI, {
            dbName: "influencer-collab",
            bufferCommands: false,
        });
    }
    return connectionPromise;
}

connectDB().catch((err) => console.error("MongoDB connection error:", err));

export default mongoose;
