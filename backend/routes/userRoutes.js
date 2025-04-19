import express from "express";
import { getAllUsers, getUserById} from "../controllers/userController.js";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/", verifyToken, isAdmin, getAllUsers);

//get specific user by id
router.get("/:id", verifyToken, getUserById);

export default router;