import express from "express";
import {deleteTechnician, getAllTechnicians, getTechnicianById, updateTechnician} from "../controllers/technicianController.js";

const router = express.Router();

router.get("/:id", getTechnicianById);
router.get("/", getAllTechnicians);
router.put("/:id", updateTechnician);
router.delete("/:id", deleteTechnician);

export default router;