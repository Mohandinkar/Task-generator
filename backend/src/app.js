import express from "express";
import generateRouter from "./routes/generate.routes.js";

const app = express();

app.use(express.json());

app.use(generateRouter);

export default app;

