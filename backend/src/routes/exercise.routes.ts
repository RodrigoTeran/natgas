import express from "express";

import { createService } from "../middlewares/roles.middleware";
import { newExercise } from "../controllers/exercise/exercise.controller";

const router = express.Router();

router.post("/new", createService("Añadir ejercicio"), newExercise);

export default router;
