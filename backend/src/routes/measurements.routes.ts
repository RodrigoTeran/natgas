import express from "express";

import {
    createMeasurement,
} from "../controllers/measurements/measurements.controller";
import {
    createService
} from "../middlewares/roles.middleware";

const router = express.Router();

router.post("/", createService("Consultar medidas corporales"), createMeasurement);

export default router;