import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// List of allowed origins
const allowedOrigins = [
  process.env.FRONTEND_URL,           // https://book-review-lake.vercel.app
  'http://localhost:5173'             // local dev (Vite default)
];

// CORS configuration
app.use(cors({
  origin: function(origin, callback){
    // Allow requests with no origin (like Postman or server-to-server)
    if(!origin) return callback(null, true);

    if(allowedOrigins.includes(origin)){
      callback(null, true);
    } else {
      callback(new Error('CORS policy: This origin is not allowed'));
    }
  },
  credentials: true, // allow cookies
}));

// Middleware
app.use(express.json());
app.use(cookieParser());

// Your routes
app.use('/api', loginRoute);
app.use('/api/books', protect, bookRoute);
app.use('/api/review', protect, reviewRoute);

// MongoDB connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Database connected'))
  .catch(err => console.error(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
