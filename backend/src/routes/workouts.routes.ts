import express from "express";

import {
    getFavWorkouts,
    getAllWorkouts,
    likeUnlike
} from "../controllers/workouts/workouts.controller";
import {
    isAuth
} from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/favs", isAuth, getFavWorkouts);
router.get("/", isAuth, getAllWorkouts);
router.put("/like/:workoutId", isAuth, likeUnlike);

export default router;