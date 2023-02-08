import express from 'express';
import mongoose from 'mongoose';
import router from "./router.js";
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT;
const DB_URL = process.env.MONGO_URL;

const app =express();

app.use(express.json());
app.use('/api', router);

async function startApp(uri, callback) {
    try {
        await mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
        app.listen(PORT, ()=>{
            console.log(`SERVER START ON ${PORT} PORT`)
        })
    } catch (e) {
        console.log(e);
    }
}

startApp();