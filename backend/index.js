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

app.use(cors(process.env.CLIENT_URL));
app.use(clerkMiddleware());
app.use("/webhooks", webhookRouter);
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
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

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message || "Something went wrong!",
    status: error.status,
    stack: error.stack,
  });
});

app.listen(3000, () => {
  connectDB();
  console.log("Server is running!");
});
