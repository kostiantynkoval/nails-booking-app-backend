import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoute from './routes/auth.js';

dotenv.config();

const basePath = '/api/v1';
const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
    origin: true
}

app.get('/', (req,res) => {
    res.send('API is working');
});

// database connection
mongoose.set('strictQuery', false);
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    } catch (e) {
        console.log('Mongo database connection is failed', e)
    }
}

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(`${basePath}/auth`, authRoute);

app.listen(port, () => {
    connectDB().then(() => console.log('Mongo database is connected'))
    console.log(`Server is running on port ${port}`)
})