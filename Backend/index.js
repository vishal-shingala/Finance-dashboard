import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import route from './routes/route.js';
import cookieParser from 'cookie-parser';

const app = express();
dotenv.config();

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));
app.use(cookieParser())
app.use(express.json());
connectDB();

app.use('/api/v1', route);

app.listen(process.env.PORT || 5000, ()=>{
    console.log(`Server is running on PORT ${process.env.PORT || 5000}`);
})