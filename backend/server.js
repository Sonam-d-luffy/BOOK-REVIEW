import mongoose from "mongoose";
import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import loginRoute from './routes/login.js'
import bookRoute from './routes/book.js'
import reviewRoute from './routes/review.js'
import { protect } from "./middleware/authMiddleware.js";
import cookieParser from 'cookie-parser';


dotenv.config()



const app = express()

const allowedOrigins = [
  process.env.FRONTEND_URL,         // deployed frontend
  "http://localhost:5173"           // local development (Vite default)
];

app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("CORS policy: This origin is not allowed"));
    }
  },
  credentials: true,             // allow cookies
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  preflightContinue: false,
  optionsSuccessStatus: 204
}));
app.use(express.json())
app.use(cookieParser());
app.use('/api' ,loginRoute)
app.use('/api/books',protect, bookRoute)
app.use('/api/review',protect, reviewRoute)



mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Database conncted'))
.catch((err) => console.error(err))

app.listen(process.env.PORT || 5000 , () => {
    console.log('server is running')
})