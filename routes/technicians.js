import express from "express";
import {deleteTechnician, getAllTechnicians, getTechnicianById, updateTechnician} from "../controllers/technicianController.js";
import {authenticate, restrictByRole} from "../auth/verifyToken.js";
import {Roles} from "../types/types.js";

const router = express.Router();

router.get("/:id", getTechnicianById);
router.get("/", getAllTechnicians);
router.put("/:id", authenticate, restrictByRole([Roles.TECHNICIAN, Roles.ADMIN]), updateTechnician);
router.delete("/:id", authenticate, restrictByRole([Roles.TECHNICIAN, Roles.ADMIN]), deleteTechnician);

export default router;