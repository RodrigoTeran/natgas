import express from "express";
import { isAuth } from "../middlewares/auth.middleware";
import {
	fetchEntry,
	findByUser,
	newEntry,
} from "../controllers/bitacora/bitacora.controller";

const router = express.Router();

router.get("/:date", isAuth, findByUser);
router.post("/new", isAuth, newEntry);
router.get("/consultar-entrada/:id", isAuth, fetchEntry);

export default router;
