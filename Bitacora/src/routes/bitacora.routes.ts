import express from "express";
import { isAuth } from "../middlewares/auth.middleware";

const bitacoraController = require("../controllers/index.controller");

const router = express.Router();

router.get("/bitacora/:id/:date", isAuth, bitacoraController.findByUser);
router.post("/bitacora/new", isAuth, bitacoraController.newEntry);

export default router;
