# 📚 Book Review Platform (MERN Stack)

A full-stack Book Review Platform built using **MongoDB**, **Express**, **React**, and **Node.js**.  
It supports user authentication, book management, and secure review submission.

---

## 🚀 Features

- 🔐 Secure user authentication (JWT + Cookies)
- 📘 Book management (add, view, delete)
- ✍️ Add and view reviews for books
- 🛡 Protected routes using middleware
- 🌐 CORS enabled for secure frontend-backend communication
- ☁️ Environment variables for configuration

---

## 🧱 Tech Stack

**Frontend:** React  
**Backend:** Node.js + Express  
**Database:** MongoDB  
**Authentication:** JWT (stored in HTTP-only cookies)  
**Environment Management:** dotenv  

---

## ⚙️ Folder Structure

backend/
│
├── routes/
│ ├── login.js
│ ├── book.js
│ └── review.js
│
├── middleware/
│ └── authMiddleware.js
│
├── models/
│ ├── userModel.js
│ ├── bookModel.js
│ └── reviewModel.js
│
├── server.js
├── .env
└── package.json


---

## 🔧 Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/book-review-platform.git
   cd backend


Install dependencies

npm install


Create a .env file in the root of the backend folder with the following variables:

MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=https://your-frontend-domain.com
PORT=5000


⚠️ Make sure to:

Replace FRONTEND_URL with your actual deployed React frontend URL
(e.g., https://bookapp.netlify.app)

Replace MONGO_URL with your MongoDB Atlas or local MongoDB URI.

Set a strong JWT_SECRET value.

Start the backend server

npm start


You should see:

Database connected
server is running

🛣️ API Routes
Route	Method	Description	Protected
/api/register	POST	Register new user	❌
/api/login	POST	Login user	❌
/api/books	GET/POST/DELETE	Manage books	✅
/api/review	POST/GET	Add or get reviews	✅
🧩 Middleware

authMiddleware.js → verifies JWT tokens and protects private routes.

cookieParser → parses cookies to access JWT.

🌍 CORS Configuration

The backend uses dynamic CORS validation:

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173", // for local testing
  "http://localhost:3000"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS policy: This origin is not allowed"));
    }
  },
  credentials: true
}));


✅ Tip:
If you face CORS issues during deployment (e.g. Render or Vercel), check your frontend domain matches FRONTEND_URL exactly (including https://).
