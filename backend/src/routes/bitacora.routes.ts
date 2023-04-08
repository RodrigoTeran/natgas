import express from "express";
import { createService } from "../middlewares/roles.middleware";
import {
	fetchEntry,
	findByUser,
	newEntry,
	updateEntry,
} from "../controllers/bitacora/bitacora.controller";

const router = express.Router();

router.get("/:date", createService("Consultar entradas bitácora"), findByUser);
router.post("/new", createService("Añadir entrada a bitácora"), newEntry);
router.get(
	"/consultar-entrada/:id",
	createService("Consultar entradas bitácora"),
	fetchEntry
);
router.put(
	"/consultar-entrada/:id",
	createService("Editar entrada de bitácora"),
	updateEntry
);

export default router;
