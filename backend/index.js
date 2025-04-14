import express from "express";
import connectDB from "./lib/connectDB.js";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import commentRouter from "./routes/comment.route.js";
import webhookRouter from "./routes/webhook.route.js";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import cors from "cors";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: `${__dirname}/.env` });

console.log('ImageKit Public Key:', process.env.IMAGEKIT_PUBLIC_KEY);
console.log('ImageKit Private Key:', process.env.IMAGEKIT_PRIVATE_KEY);
console.log('ImageKit URL Endpoint:', process.env.IMAGEKIT_URL_ENDPOINT);

const app = express();

// Add CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true
}));

// Add debug logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Add test endpoint
app.get("/test", (req, res) => {
  res.json({ message: "Server is working!" });
});

app.use(clerkMiddleware());
app.use("/webhooks", webhookRouter);
app.use(express.json());

// Add CORS headers
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL || "http://localhost:5173");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Add this new route for the root path
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the PCMI Blog API" });
});

// Your existing routes
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

// Error handling middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message || "Something went wrong!",
    status: error.status,
    stack: error.stack,
  });
});

// Start server
app.listen(3000, () => {
  connectDB();
  console.log("Server is running on port 3000!");
});