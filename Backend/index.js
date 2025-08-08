import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
connectDB();

app.get('/api/v1', (req, res)=>{
    res.send('Got it!');
    
})

app.listen(process.env.PORT || 5000, ()=>{
    console.log(`Server is running on PORT ${process.env.PORT || 5000}`);
})