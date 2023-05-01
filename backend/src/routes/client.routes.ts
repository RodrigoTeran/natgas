import express from "express";
import { createService } from "../middlewares/roles.middleware";
import {
	registerClient,
	fetchInfo,
	updateInfo,
	deleteUser,
	changeUserRole,
} from "../controllers/client/client.controller";
import { isAuth } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/register", isAuth, registerClient);
router.get(
	"/infoCliente",
	createService("Consultar información personal del perfil"),
	fetchInfo
);
router.put(
	"/infoCliente/:id",
	createService("Editar información personal del perfil"),
	updateInfo
);
router.delete("/eliminarCuenta", createService("Eliminar cuenta"), deleteUser);
router.post('/editarRol', createService("Editar rol de un usuario"), changeUserRole)
export default router;
