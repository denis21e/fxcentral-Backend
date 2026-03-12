
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/contact.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

const mongoUri = process.env.MONGODB_URI;

async function startServer() {
    try {
        const conn = await mongoose.connect(mongoUri);
        console.log(`MongoDb Connected: ${conn.connection.host}`);
        app.use("/api/user", router);
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
}

startServer();