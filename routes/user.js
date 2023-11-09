import express from "express";
import {deleteUser, getAllUsers, getUserById, updateUser} from "../controllers/userController.js";

const router = express.Router();

router.get("/:id", getUserById);
router.get("/", getAllUsers);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;