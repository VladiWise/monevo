import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URL;

// Определяем интерфейс для кэша
interface MongooseConnection {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

// Расширяем глобальный объект
declare global {
    var mongoose: MongooseConnection | undefined;
}

// Инициализируем кэш
const cached: MongooseConnection = global.mongoose || {
    conn: null,
    promise: null,
};

if (process.env.NODE_ENV !== 'production') {
    global.mongoose = cached;
}

async function connectMongoDB() {
    if (!MONGODB_URI) {
        throw new Error("Please define the MONGODB_URL environment variable");
    }

    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
        return cached.conn;
    } catch (error) {
        cached.promise = null;
        throw error;
    }
}

// Обработчики событий
mongoose.connection.on("connected", () => {
    console.log("MongoDB connected successfully");
});

mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
});

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected");
});

// Graceful shutdown
process.on("SIGINT", async () => {
    if (cached.conn) {
        await mongoose.connection.close();
    }
    process.exit(0);
});

export default connectMongoDB;










//////////////////////////////////////////////////////////////////////////////////////////////////////
// import mongoose from "mongoose";


// export default async function connectMongoDB() {
//     const MONGO_URI = process.env.MONGODB_URL;
//     if (!MONGO_URI) {
//         console.error("MONGODB_URL environment variable is not set.");
//         throw new Error("MONGODB_URL environment variable is not set.");
//     }

//     try {
//         const client = await mongoose.connect(MONGO_URI);
//         console.log("Connected to MongoDB");
//         return client;
//     } catch (error) {
//         console.error("Error connecting to MongoDB:", error);
//         throw error;
//     }
// };
