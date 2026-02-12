import express from "express";
import cors from "cors";
import generateRouter from "./routes/generate.routes.js";

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://task-generator-livid.vercel.app/"
  ],
  credentials: true
}));

app.use(express.json());

app.use(generateRouter);

export default app;

