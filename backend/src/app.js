import express from "express";
import generateRouter from "./routes/generate.routes.js";
import cors from "cors";

const app = express();

app.use(cors({
  origin: [
    "https://task-generator-livid.vercel.app"
  ],
  methods: ["GET","POST","OPTIONS"],
  allowedHeaders: ["Content-Type"],
  credentials: true
}));

app.options("*", cors()); 

app.use(express.json());

app.use(generateRouter);

export default app;

