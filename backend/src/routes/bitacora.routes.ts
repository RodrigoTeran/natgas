import express from "express";
import { createService } from "../middlewares/roles.middleware";
import {
	deleteEntry,
	downloadEntries,
	fetchEntry,
	findByUser,
	newEntry,
	updateEntry,
} from "../controllers/bitacora/bitacora.controller";

const router = express.Router();

router.get(
	"/downloadEntries",
	createService("Descargar entradas de bitácora"),
	downloadEntries
);
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
router.delete(
	"/consultar-entrada/:id",
	createService("Eliminar entrada de bitácora"),
	deleteEntry
);

export default router;
