import express from "express";
import { isAuth } from "../middlewares/auth.middleware";
import {
    findByUser,
    newEntry
} from "../controllers/bitacora/bitacora.controller"

const router = express.Router();

router.get("/:date", isAuth, findByUser);
router.post("/new", isAuth, newEntry);

export default router;
