import pool from "../../db/connection";
import type { IUser } from "../../interfaces/User.interface";

class User {
	currentUser: IUser;

	constructor(currentUser: IUser) {
		this.currentUser = currentUser;
	}

	static async findById(id: string): Promise<IUser | null> {
		const [rows] = await pool.execute(
			"SELECT * FROM client WHERE id = ? LIMIT 1;",
			[id]
		);

		if (rows.length === 0) {
			return null;
		}

		const user = rows[0];
		return user;
	}
}

export default User;
