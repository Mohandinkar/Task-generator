import express from "express";
import cors from "cors";
import generateRouter from "./routes/generate.routes.js";

const app = express();

app.use(cors({ origin: true, credentials: true }))

app.use(express.json());

app.use(generateRouter);

export default app;

