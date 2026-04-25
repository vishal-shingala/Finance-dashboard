import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/database.js';
import route from './routes/route.js';
import cookieParser from 'cookie-parser';
import { createLogger } from './utils/logger.js';

const app = express();
const logger = createLogger('server');

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));
app.use(cookieParser())
app.use(express.json());

app.use((req, res, next) => {
  const start = Date.now();
  logger.info('Incoming request', {
    method: req.method,
    path: req.originalUrl,
    ip: req.ip,
  });

  res.on('finish', () => {
    logger.info('Request completed', {
      method: req.method,
      path: req.originalUrl,
      statusCode: res.statusCode,
      durationMs: Date.now() - start,
    });
  });

  next();
});

connectDB();

app.use('/api/v1', route);

app.use((err, req, res, next) => {
  logger.error('Unhandled application error', {
    method: req.method,
    path: req.originalUrl,
    message: err.message,
  });
  next(err);
});

app.listen(process.env.PORT || 5000, ()=>{
    logger.info(`Server is running on PORT ${process.env.PORT || 5000}`);
})