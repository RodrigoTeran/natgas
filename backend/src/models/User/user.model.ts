import pool from "../../db/connection";
import { fromString, uuid } from "uuidv4";
import type { IUser } from "../../interfaces/User.interface";
import Roles from "../Roles/roles.model";
import { IServices } from "../../middlewares/roles.middleware";

class User {
	currentUser: IUser;

	constructor(currentUser: IUser) {
		this.currentUser = currentUser;
	}

	static async register(
		id: string,
		username: string,
		sex: string,
		dateOfBirth: Date,
		weight: number,
		height: number,
		goal: string,
		level: string
	) {
		await pool.execute(
			"UPDATE client SET username = ?, sex = ?, dateOfBirth = ? WHERE id = ?;",
			[username, sex, dateOfBirth, id]
		);

		const idempotencyKeyWeight = uuid();
		await pool.execute(
			"INSERT INTO weight(id, clientId, measurement) VALUES (?, ?, ?);",
			[idempotencyKeyWeight, id, weight]
		);

		const idempotencyKeyHeight = uuid();
		await pool.execute(
			"INSERT INTO height(id, clientId, measurement) VALUES (?, ?, ?);",
			[idempotencyKeyHeight, id, height]
		);

		const idempotencyKeyGoal = uuid();
		await pool.execute("INSERT INTO goal(id, name) VALUES (?, ?);", [
			idempotencyKeyGoal,
			goal,
		]);

		await pool.execute(
			"INSERT INTO clientGoal(clientId, goalId) VALUES (?, ?);",
			[id, idempotencyKeyGoal]
		);

		const idempotencyKeyLevel = uuid();
		await pool.execute("INSERT INTO physicLevel(id, name) VALUES (?, ?);", [
			idempotencyKeyLevel,
			level,
		]);

		await pool.execute(
			"INSERT INTO clientLevel(clientId, physicLevelId) VALUES (?, ?);",
			[id, idempotencyKeyLevel]
		);
	}

	static async findOne(providerId: string): Promise<IUser | null> {
		const [rows] = await pool.execute(
			`
            SELECT
                client.*,
                rol.name as role
            FROM
                client,
                clientRol,
                rol
            WHERE
                client.authProviderId = ?
                AND clientRol.clientId = client.id
                AND clientRol.rolId = rol.id
            LIMIT 1;
        `,
			[providerId]
		);

		if (rows.length === 0) {
			return null;
		}

		const user = rows[0];
		return user;
	}

	static async fetchInfo(id: string): Promise<IUser | null | boolean> {
		const [rows] = await pool.execute(`
        SELECT _client.username, _client.dateOfBirth, _image.src, _physicLevel.name, _goal.name, _height.measurement, _weight.measurement
        FROM client as _client, physicLevel as _physicLevel, goal as _goal, height as _height, weight as _weight, image as _image, clientLevel as _clientLevel, clientGoal as _clientGoal
        WHERE _physicLevel.id = _clientLevel.physicLevelId
        AND _clientLevel.clientId = _client.id
        AND _image.id = _client.imageId
        AND _goal.id = _clientGoal.goalId
        AND _clientGoal.clientId = _client.id
        AND _height.clientId = _client.id
        AND _weight.clientId = _client.id;
        `);

		if (rows.length === 0) {
			return null;
		}

		const user = rows[0];
		return user;
	}

	static async updateInfo(
		clientId: string,
		id: string,
		username: string,
		src: string,
		dateOfBirth: Date,
		weight: number,
		height: number,
		goal: string,
		level: string
	) {
		await pool.execute(
			`
			UPDATE client SET username = ?, dateOfBirth = ? WHERE clientID =? AND id = ?
			`,
			[username, dateOfBirth, clientId, id]
		);

		await pool.execute(
			`
			UPDATE image SET src = ? WHERE clientID =? AND id = ?
			`,
			[src, clientId, id]
		);

		await pool.execute(
			`
			UPDATE clientLevel cl
			JOIN physicLevel pl ON cl.physicLevelId = pl.id
			SET cl.physicLevelId = ?
			WHERE cl.clientID = ? AND cl.id = ?
			`,
			[level, clientId, id]
		);

		await pool.execute(
			`
			UPDATE clientGoal cg
			JOIN goal g ON cg.goalId = g.id
			SET cg.goalId = ?
			WHERE cg.clientID = ? AND cg.id = ?
			`,
			[goal, clientId, id]
		);

		await pool.execute(
			`
			UPDATE height SET measurement = ? WHERE clientID =? AND id = ?
			`,
			[height, clientId, id]
		);

		await pool.execute(
			`
			UPDATE weight SET measurement = ? WHERE clientID =? AND id = ?
			`,
			[weight, clientId, id]
		);
	}

	static async findById(id: string): Promise<IUser | null> {
		const [rows] = await pool.execute(
			`
            SELECT
                client.*,
                rol.name as role
            FROM
                client,
                clientRol,
                rol
            WHERE
                client.id = ?
                AND clientRol.clientId = ?
                AND clientRol.rolId = rol.id
            LIMIT 1;
        `,
			[id, id]
		);

		if (rows.length === 0) {
			return null;
		}

		const user = rows[0];
		return user;
	}

	static async checkService(
		id: string,
		service: IServices
	): Promise<IUser | null | boolean> {
		const user: IUser | null = await User.findById(id);

		if (user === null) {
			// No auth
			return null;
		}

		const isService: boolean = await Roles.checkUserService(user, service);

		if (!isService) return false;

		return user;
	}

	async save(providerId: string): Promise<IUser | null> {
		const idempotencyKey = fromString(providerId);

		await pool.execute(
			`INSERT INTO client(id, authProvider, authProviderId) VALUES
            (?, ?, ?);`,
			[idempotencyKey, "Google", providerId]
		);

		await pool.execute(
			`INSERT INTO clientRol(clientId, rolId) VALUES (?, 'uuidR02');`,
			[idempotencyKey]
		);

		const user = await User.findOne(providerId);

		return user;
	}
}

export default User;
