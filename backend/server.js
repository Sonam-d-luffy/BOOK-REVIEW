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

app.use(cors({
  origin: process.env.FRONTEND_URL, // frontend origin
  credentials: true,              // allow cookies
}));
app.use(express.json())
app.use(cookieParser());
app.use('/api' ,loginRoute)
app.use('/api/books',protect, bookRoute)
app.use('/api/review',protect, reviewRoute)



mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Database conncted'))
.catch((err) => console.error(err))

app.listen(process.env.PORT , () => {
    console.log('server is running')
})