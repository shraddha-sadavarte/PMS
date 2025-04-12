import express from "express";
import {getTasks, createTask} from "../controllers/taskController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/",verifyToken, getTasks);
router.post("/", verifyToken, createTask);

export default router;