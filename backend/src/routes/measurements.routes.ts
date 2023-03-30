import express from "express";

import {
    createMeasurement,
} from "../controllers/measurements/measurements.controller";
import {
    isAuth
} from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/", isAuth, createMeasurement);

export default router;