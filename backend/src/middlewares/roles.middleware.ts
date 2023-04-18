import User from "../models/User/user.model";

export type IServices =
	| "Consultar información de progreso"
	| "Consultar dietas"
	| "Editar dieta"
	| "Editar ejercicio"
	| "Editar rutina"
	| "Añadir medidas corporales"
	| "Consultar entradas bitácora"
	| "Añadir rutina"
	| "Consultar rutinas"
	| "Editar información personal del perfil"
	| "Editar entrada de bitácora"
	| "Añadir dieta"
	| "Añadir entrada a bitácora"
	| "Añadir ejercicio"
	| "Editar medidas corporales"
	| "Eliminar medidas corporales"
	| "Consultar medidas corporales"
	| "Editar rol de un usuario"
	| "Añadir/eliminar dieta a favoritos"
	| "Añadir/eliminar rutina a favoritos"
	| "Eliminar entrada de bitácora"
	| "Eliminar dieta"
	| "Eliminar ejercicio"
	| "Eliminar rutina"
	| "Consultar usuarios"
	| "Consultar ejercicios"
	| "Descargar entradas de bitácora"
	| "Eliminar cuenta";

export const createService = (service: IServices) => {
	return async (req, res, next) => {
		const token = req.headers["authorization"];

		if (token === undefined || token === null) {
			return res.json({
				auth: false,
				msg: "Usuario no autenticado",
				data: {
					user: null,
				},
			});
		} else {
			const user = await User.checkService(token, service);

			if (user === null) {
				return res.json({
					auth: false,
					msg: "Usuario no autenticado",
					data: {
						user: null,
					},
				});
			}
			if (user === false) {
				return res.json({
					auth: false,
					msg: "Usuario no tiene permisos para esta acción",
					data: {
						user: null,
					},
				});
			}

			req.user = user;
			return next();
		}
	};
};
