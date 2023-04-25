import express from "express";

import { createService } from "../middlewares/roles.middleware";
import {
	newExercise,
	getAll,
	update
} from "../controllers/exercise/exercise.controller";

const router = express.Router();

router.post("/crear-ejercicio", createService("Añadir ejercicio"), newExercise);
router.get("/", createService("Consultar ejercicios"), getAll);
router.post("/editar", createService("Editar ejercicio"), update)

export default router;
