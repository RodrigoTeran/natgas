import express from "express";

import {
    getFavWorkouts,
    getAllWorkouts,
    likeUnlike,
    createWorkout,
    getWorkout,
    deleteWorkout
} from "../controllers/workouts/workouts.controller";
import {
    createService
} from "../middlewares/roles.middleware";

const router = express.Router();

router.get("/favs", createService("Consultar rutinas"), getFavWorkouts);
router.post("/create", createService("Añadir rutina"), createWorkout);
router.get("/", createService("Consultar rutinas"), getAllWorkouts);
router.delete("/eliminar-rutina/:id", createService("Eliminar rutina"), deleteWorkout);
router.get("/rutina/:id", createService("Consultar rutinas"), getWorkout);
router.put("/like/:workoutId", createService("Añadir/eliminar rutina a favoritos"), likeUnlike);

export default router;