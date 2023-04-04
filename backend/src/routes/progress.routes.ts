import { getAll } from "../controllers/progreso/progress.controller";
import express from "express";
import {
    createService
} from "../middlewares/roles.middleware";

const router = express.Router();
router.get("/", createService("Consultar información de progreso"), getAll);

export default router;

