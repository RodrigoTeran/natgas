import express from "express";

import { createExercise } from "../controllers/exercise/exercise.controller";

const router = express.Router();

router.post("/rutinas", createService("Añadir ejercicio"), createExercise);

export default router;
