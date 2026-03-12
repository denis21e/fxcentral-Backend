import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/contact.js"

const app = express();

const PORT = 5000;

app.use(express.json());
app.use(cors());


try {
    const conn = await mongoose.connect("mongodb+srv://denis:nIp6MREclyw9bECS@mern.5dgxw.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=MERN");
    console.log(`MongoDb Connected: ${conn.connection.host}`);
} catch (error) {
    console.error(`${error}`);
    process.exit(1);
}

app.use("/api/user", router);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});