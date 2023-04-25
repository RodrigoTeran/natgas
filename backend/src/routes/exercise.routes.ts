import express from "express";

import { createService } from "../middlewares/roles.middleware";
import {
	newExercise,
	getAll,
	update,
	fetchOne
} from "../controllers/exercise/exercise.controller";

const router = express.Router();

router.post("/crear-ejercicio", createService("Añadir ejercicio"), newExercise);
router.get("/", createService("Consultar ejercicios"), getAll);
router.post("/editar", createService("Editar ejercicio"), update);
router.get("/ejercicio", createService("Editar ejercicio"), fetchOne);

export default router;
