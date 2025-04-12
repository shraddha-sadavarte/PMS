import express from "express";
import { getProjects, createProject } from "../controllers/projectController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
const router= express.Router();

router.get("/", verifyToken, getProjects);
router.post("/", verifyToken, createProject);

export default router;