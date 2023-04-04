import express from "express";

import {
    getFavWorkouts,
    getAllWorkouts,
    likeUnlike
} from "../controllers/workouts/workouts.controller";
import {
    createService
} from "../middlewares/roles.middleware";

const router = express.Router();

router.get("/favs", createService("Consultar rutinas"), getFavWorkouts);
router.get("/", createService("Consultar rutinas"), getAllWorkouts);
router.put("/like/:workoutId", createService("Añadir/eliminar rutina a favoritos"), likeUnlike);

export default router;