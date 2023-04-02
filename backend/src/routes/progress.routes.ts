import {getAll} from "../controllers/progreso/progress.controller";
import express from "express";
import { isAuth } from "../middlewares/auth.middleware";

const router = express.Router();
router.get("/", isAuth, getAll);

export default router;

