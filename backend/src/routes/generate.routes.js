import { Router } from "express";
import {
  generateHandler,
  healthHandler,
} from "../controllers/generate.controller.js";

const router = Router();

router.get("/health", healthHandler);
router.post("/generate", generateHandler);

export default router;

