import app from "./app.js";
import dotenv from "dotenv";

import cors from "cors";

dotenv.config();

app.use(cors({
  origin: [
    "https://task-generator-livid.vercel.app"
  ],
  credentials: true,
}))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});