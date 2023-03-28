import express from "express";

import {
    getWorkouts
} from "../controllers/index.controller";
import {
    isAuth
} from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/", isAuth, getWorkouts);

export default router;