import express from "express";
import { createService } from "../middlewares/roles.middleware";
import {
	registerClient,
	fetchInfo,
	updateInfo,
	deleteUser,
	changeUserRole,
	getAllUsers,
	updateBlock1,
	updateBlock2,
} from "../controllers/client/client.controller";
import { isAuth } from "../middlewares/auth.middleware";

const router = express.Router();

router.post(
	"/register",
	isAuth,
	createService("Registrar usuario"),
	registerClient
);
// router.put(
// 	"/info-cliente/:id",
// 	createService("Editar información personal del perfil"),
// 	updateInfo
// );
router.put(
	"/update-cliente1/:id",
	createService("Update block 1"),
	updateBlock1
);
router.get("/usuarios", createService("Consultar usuarios"), getAllUsers);
router.put(
	"/update-cliente2/:id",
	createService("Editar información personal del perfil"),
	updateBlock2
);
router.get("/fetch-info/:id", createService("Info de perfil"), fetchInfo);
router.delete("/eliminarCuenta", createService("Eliminar cuenta"), deleteUser);
router.post(
	"/editarRol",
	createService("Editar rol de un usuario"),
	changeUserRole
);
export default router;
