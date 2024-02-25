import express from "express";
import { sendMessage } from "../controllers/message.controller.js";
import { protectedRoutes } from "../middlewares/protectedRoutes.js";

const router = express.Router();

router.post("/send/:id", protectedRoutes, sendMessage);

export default router;
