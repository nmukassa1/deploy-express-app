import express, { Request, Response, Application } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import todoRoute from "./routes/todoRoute";
import xss from "xss";
import cookieParser from "cookie-parser";
import path from "path";
import { clerkMiddleware } from '@clerk/express';
import dotenv from 'dotenv';
import clerkWebhook from './routes/clerkWebhook';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

const clerkSecretKey = process.env.CLERK_SECRET_KEY_DEV;

if (!clerkSecretKey) {
  console.log(8888);
  
  // throw new Error('Missing Clerk Secret Key. Go to https://dashboard.clerk.com and get your key for your instance.');
}

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN_PRODUCTION || process.env.CORS_ORIGIN_DEV, credentials: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(clerkMiddleware({
  secretKey: process.env.CLERK_SECRET_KEY_DEV || process.env.CLERK_SECRET_KEY_PRODUCTION ,
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY_DEV || process.env.CLERK_PUBLISHABLE_KEY_PRODUCTION,
}));

// Serve static frontend
app.use(express.static(path.join(__dirname, "../public"))); // ✅ Correct path



// API Routes
app.use("/api", todoRoute);
app.use("/api", clerkWebhook);

// React Catch-All Route (Must be at the bottom)
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "public", "index.html")); // ✅ Correct path resolution
});



// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT} `);
});