import express from "express";
import { getAllUsers} from "../controllers/userController.js";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/", verifyToken, isAdmin, getAllUsers);

export default router;