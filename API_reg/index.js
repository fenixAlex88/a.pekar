import express from 'express';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import cors from 'cors';
import authRouter from './authRouter.js';


dotenv.config();
const PORT = process.env.PORT;
const DB_URL = process.env.MONGO_URL;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/auth', authRouter)

async function start() {
    try {
        await mongoose.connect(DB_URL);
        app.listen(PORT, () => {
            console.log(`SERVER START ON ${PORT} PORT`)
        })
    } catch (e) {
        console.log(e);
    }
}

start();