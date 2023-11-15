import express from "express";
import {deleteUser, getAllUsers, getUserById, updateUser} from "../controllers/userController.js";
import {authenticate, restrictByRole} from "../auth/verifyToken.js";
import {Roles} from "../types/types.js";

const router = express.Router();

router.get("/:id", authenticate, restrictByRole([Roles.CUSTOMER, Roles.ADMIN]), getUserById);
router.get("/", authenticate, restrictByRole([Roles.ADMIN]),  getAllUsers);
router.put("/:id", authenticate, restrictByRole([Roles.CUSTOMER, Roles.ADMIN]),  updateUser);
router.delete("/:id", authenticate, restrictByRole([Roles.CUSTOMER, Roles.ADMIN]),  deleteUser);

export default router;