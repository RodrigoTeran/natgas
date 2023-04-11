import express from "express";

import { createService } from "../middlewares/roles.middleware";
import { newExercise, getAll } from "../controllers/exercise/exercise.controller";

const router = express.Router();

router.post("/crear-ejercicio", createService("Añadir ejercicio"), newExercise);
router.get("/", createService("Consultar ejercicios"), getAll);

export default router;
