import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import loginRouter from './routers/authRoute.js';
import localRouter from './routers/localRoute.js';
import radiusRouter from './routers/radiusRoute.js';
import offerRouter from './routers/offerRoute.js';
import jobRouter from './routers/jobRoute.js';
import myStoreRouter from './routers/myStoreRoute.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "https://twitter24frontend.vercel.app",
    credentials: true
}));



app.use('', loginRouter);
app.use('', localRouter);
app.use('', radiusRouter);
app.use('', offerRouter);
app.use('', jobRouter);
app.use('', myStoreRouter);

app.post('/test', (req, res) => {
    res.json({ message: "Test route working" });
});



const PORT = process.env.PORT || 6767

app.get('/', (req, res) => {
    res.send("server is running");
})

mongoose
    .connect(process.env.MONGOOSE_URI)
    .then(() => {
        console.log('Mongoose Connected Successfully')
        app.listen(PORT, () => {
            console.log(`Server Running on ${PORT}`)
        });
    })
    .catch((e) => {
        console.log(`Error while connecting to Mongoose`, e)
    });