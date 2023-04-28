import express from "express";

import {
    createMeasurement, fetchOne, update, deleteFrom
} from "../controllers/measurements/measurements.controller";
import {
    createService
} from "../middlewares/roles.middleware";

const router = express.Router();

router.post("/", createService("Consultar medidas corporales"), createMeasurement);
router.get("/consultar", createService("Consultar medidas corporales"), fetchOne);
router.post("/edit", createService("Editar medidas corporales"), update);
router.get("/delete", createService("Eliminar medidas corporales"), deleteFrom);

export default router;