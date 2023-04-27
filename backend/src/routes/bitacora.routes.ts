import express from "express";
import { createService } from "../middlewares/roles.middleware";
import {
	deleteEntry,
	downloadExcel,
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
router.delete(
	"/consultar-entrada/:id",
	createService("Eliminar entrada de bitácora"),
	deleteEntry
);
router.get(
	"/downloadExcel",
	createService("Descargar entradas de bitácora"),
	downloadExcel
);

export default router;
