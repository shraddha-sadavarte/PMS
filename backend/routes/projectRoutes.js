import express from "express";
import {
  createProject,
  getUserProjects,
  getAllProjects,
  updateProjectProgress,
  updateProject,
  deleteProject
} from "../controllers/projectController.js";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js"

const router = express.Router();

// Admin routes
router.post("/", verifyToken, isAdmin, createProject);
router.get("/", verifyToken, isAdmin, getAllProjects);

// User route
router.get("/user", verifyToken, getUserProjects);
router.put("/:projectId/progress", verifyToken, updateProjectProgress);

router.put("/:id", verifyToken, isAdmin, updateProject);

router.delete("/:id", verifyToken, isAdmin, deleteProject);

export default router;
