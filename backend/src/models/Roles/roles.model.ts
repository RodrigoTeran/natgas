import pool from "../../db/connection";
import type { IUser } from "../../interfaces/User.interface";
import { IServices } from "../../middlewares/roles.middleware";

class Roles {
	constructor() {}

	static async checkUserService(
		user: IUser,
		service: IServices
	): Promise<boolean> {
		const [rowsService] = await pool.execute(
			`
            SELECT
                id
            FROM
                service
            WHERE
                name = ?
            LIMIT 1
            ;`,
			[service]
		);
		if (rowsService.length === 0) return false;
		const serviceId = rowsService[0].id;

		const [rows] = await pool.execute(
			`
            SELECT
                rol.*
            FROM
                rol,
                rolService,
                clientRol
            WHERE
                rolService.serviceId = ?
                AND rol.id = rolService.rolId
                AND clientRol.clientId = ?
                AND clientRol.rolId = rol.id;
            ;`,
			[serviceId, user.id]
		);
		return rows.length > 0;
	}
}

export default Roles;
