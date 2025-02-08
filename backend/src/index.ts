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

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(clerkMiddleware({
  secretKey: process.env.CLERK_SECRET_KEY,
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY
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
  console.log(`Server is running on http://localhost:${PORT} jhhhg `);
});