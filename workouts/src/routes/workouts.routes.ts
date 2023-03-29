import express from "express";

import {
    getFavWorkouts,
    getAllWorkouts
} from "../controllers/index.controller";
import {
    isAuth
} from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/favs", isAuth, getFavWorkouts);
router.get("/", isAuth, getAllWorkouts);

export default router;