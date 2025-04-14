import express from "express";
import {getTasks, createTask, updateTaskStatus} from "../controllers/taskController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/",verifyToken, getTasks);
router.post("/", verifyToken, createTask);
router.put("/:taskId", verifyToken, updateTaskStatus);

export default router;