import express from "express";
import { createService } from "../middlewares/roles.middleware";
import {
	registerClient,
	fetchInfo,
	updateInfo,
	deleteUser,
} from "../controllers/client/client.controller";
import { isAuth } from "../middlewares/auth.middleware";

const router = express.Router();

router.post(
	"/register",
	isAuth,
	createService("Registrar usuario"),
	registerClient
);
router.get(
	"/infoCliente",
	createService("Consultar información personal del perfil"),
	fetchInfo
);
router.put(
	"/info-cliente/:id",
	createService("Editar información personal del perfil"),
	updateInfo
);
router.delete("/eliminarCuenta", createService("Eliminar cuenta"), deleteUser);

export default router;
