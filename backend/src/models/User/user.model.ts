import pool from "../../db/connection";
import { fromString, uuid } from "uuidv4";
import type { IUser } from "../../interfaces/User.interface";
import Roles from "../Roles/roles.model";
import { IServices } from "../../middlewares/roles.middleware";
import { v5 as uuidv5 } from "uuid";
import { Date } from "mongoose";
import { executionAsyncResource } from "async_hooks";

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
			"INSERT INTO weight(id, clientId, measurementWeight) VALUES (?, ?, ?);",
			[idempotencyKeyWeight, id, weight]
		);

		const idempotencyKeyHeight = uuid();
		await pool.execute(
			"INSERT INTO height(id, clientId, measurementHeight) VALUES (?, ?, ?);",
			[idempotencyKeyHeight, id, height]
		);

		const idempotencyKeyGoal = uuid();
		await pool.execute("INSERT INTO goal(id, nameGoal) VALUES (?, ?);", [
			idempotencyKeyGoal,
			goal,
		]);

		await pool.execute(
			"INSERT INTO clientGoal(clientId, goalId) VALUES (?, ?);",
			[id, goal]
		);

		const idempotencyKeyLevel = uuid();
		await pool.execute(
			"INSERT INTO physicLevel(id, nameLevel) VALUES (?, ?);",
			[idempotencyKeyLevel, level]
		);

		await pool.execute(
			"INSERT INTO clientLevel(clientId, physicLevelId) VALUES (?, ?);",
			[id, level]
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

	async save(
		firstName: string,
		lastName: string,
		providerId: string,
		sex: string
	): Promise<IUser | null> {
		const idempotencyKey = fromString(providerId);

		await pool.execute(
			`INSERT INTO client(id, firstName, lastName, authProvider, authProviderId, sex) VALUES
				(?, ?, ? ,?, ?, ?);`,
			[idempotencyKey, firstName, lastName, "Google", providerId, sex]
		);

		await pool.execute(
			`INSERT INTO clientRol(clientId, rolId) VALUES (?, 'uuidR02');`,
			[idempotencyKey]
		);

		const user = await User.findOne(providerId);
		return user;
	}

	static async findAll(page: string): Promise<any> {
		const step: number = 10;
		const paged: number = parseInt(page);
		if (isNaN(paged)) return [];

		const first = step * paged;
		const second = step * paged + step;
		const [rows] = await pool.execute(
			`
			SELECT
				client.id as id,
				client.username as username,
				client.firstName as firstName,
				client.lastName as lastName,
				rol.name as rol,
				rol.id as rolId
			FROM
				client,
				clientRol,
				rol
			WHERE
				clientRol.clientId = client.id
				AND clientRol.rolId = rol.id
			LIMIT ? , ?;
			`,
			[first.toString(), second.toString()]
		);
		return rows;
	}

	static async changeUserRole(
		userId: string,
		newRoleId: string
	): Promise<boolean> {
		try {
			await pool.execute(`UPDATE clientRol SET rolId = ? WHERE clientId = ?;`, [
				newRoleId,
				userId,
			]);
			return true;
		} catch (error) {
			console.error("Error al cambiar el rol:", error);
			return false;
		}
	}

	static async getPhysicLevelId(levelName: string) {
		const [rows] = await pool.execute(
			`
		  SELECT id FROM physicLevel WHERE nameLevel = ?
		  `,
			[levelName]
		);

		if (rows.length === 0) {
			throw new Error(
				`No se encontró un nivel físico con el nombre ${levelName}.`
			);
		}

		return rows[0].id;
	}

	static async getGoalId(goalName: string) {
		const [rows] = await pool.execute(
			`
		  SELECT id FROM goal WHERE nameGoal = ?
		  `,
			[goalName]
		);

		if (rows.length === 0) {
			throw new Error(`No se encontró un objetivo con el nombre ${goalName}.`);
		}

		return rows[0].id;
	}

	static async updateInfo(
		clientId: string,
		id: string,
		username: string,
		// src: string,
		dateOfBirth: Date,
		weight: number,
		height: number,
		goal: string,
		level: string,
		sex: "M" | "F"
	) {
		const [result] = await pool.execute(
			`
			UPDATE client SET username = ?, dateOfBirth = ? WHERE id = ?
			`,
			[username, dateOfBirth, id]
		);

		if (result.affectedRows === 0) {
			throw new Error("Error al actualizar datos en la tabla client.");
		}

		const heightId = uuid();

		const [result3] = await pool.execute(
			`
			INSERT INTO height (id, measurementHeight, clientID) VALUES(?,?,?)
			`,
			[heightId, height, clientId]
		);

		if (result3.affectedRows === 0) {
			throw new Error("Error al actualizar datos en la tabla height.");
		}

		const weightId = uuid();

		const [result4] = await pool.execute(
			`
			INSERT INTO weight (id, measurementWeight, clientID) VALUES(?,?,?)
			`,
			[weightId, weight, clientId]
		);
		if (result4.affectedRows === 0) {
			throw new Error("Error al actualizar datos en la tabla weight.");
		}

		const physicLevelId = await User.getPhysicLevelId(level);

		const [result1] = await pool.execute(
			`
			Insert clientLevel(clientId, physicLevelId) VALUES (?, ?)`,
			[clientId, physicLevelId]
		);

		if (result1.affectedRows === 0) {
			// throw new Error(level);
			throw new Error("Error al actualizar datos en la tabla clientLevel.");
		}

		const goalId = await User.getGoalId(goal);

		const [result2] = await pool.execute(
			`
			INSERT INTO clientGoal(clientId, goalId) VALUES (?,?)
			`,
			[clientId, goalId]
		);

		if (result2.affectedRows === 0) {
			throw new Error("Error al actualizar datos en la tabla client goal.");
		}

		const [resultn] = await pool.execute(
			`
		UPDATE client SET sex = ? WHERE id = ?`,
			[sex, id]
		);

		if (resultn === 0) {
			throw new Error("Error al actualizar sexo");
		}
	}

	static async fetchInfo(id: string) {
		const [rows] = await pool.execute(
			`
			select _client.username, _client.firstName, _client.lastName, _client.sex, _client.dateOfBirth, _weight.measurementWeight, _height.measurementHeight, _physicLevel.nameLevel, _goal.nameGoal from client _client, height _height, weight _weight, clientLevel _clientLevel, physicLevel _physicLevel, clientGoal _clientGoal, goal _goal WHERE _client.id = _weight.clientId AND _client.id = _height.clientId AND _client.id = _clientLevel.clientId AND _clientLevel.physicLevelId = _physicLevel.id AND _client.id = _clientGoal.clientId AND _clientGoal.goalId = _goal.id AND _client.id = ?

        `,
			[id]
		);

		if (rows.affectedRows === 0) {
			throw new Error("modelo");
		}
		
		return rows[0];
	}

	static async updateBlock1(
		clientId: string,
		id: string,
		firstName: string,
		lastName: string,
		username: string,
		weight: any,
		height: any,
		dateOfBirth: Date
	) {
		const [result] = await pool.execute(
			`
			UPDATE client SET username = ? WHERE id = ?
			`,
			[username, id]
		);

		if (result.affectedRows === 0) {
			throw new Error("Error al actualizar datos en la tabla client.");
		}

		const [result1] = await pool.execute(
			`
					UPDATE height SET measurementHeight = ? WHERE clientID = ?
					`,
			[height, clientId]
		);
		if (result1.affectedRows === 0) {
			throw new Error("Error al actualizar datos en la tabla height.");
		}

		const [result4] = await pool.execute(
			`
			UPDATE weight SET measurementWeight = ? WHERE clientID = ?;
			`,
			[weight, clientId]
		);
		if (result4.affectedRows === 0) {
			throw new Error("Error al actualizar datos en la tabla weight.");
		}

		const [result2] = await pool.execute(
			`
		UPDATE client set firstName = ? WHERE id = ?

		`,
			[firstName, id]
		);
		if (result2.affectedRows === 0) {
			throw new Error("Error al actualizar datos en first name.");
		}

		const [result3] = await pool.execute(
			`
		UPDATE client set lastName = ? WHERE id = ?
`,
			[lastName, id]
		);

		if (result3.affectedRows === 0) {
			throw new Error("Error al actualizar datos en last name.");
		}

		const [result5] = await pool.execute(
			`
			UPDATE client SET dateOfBirth = ? WHERE id = ?
			`,
			[dateOfBirth, id]
		);

		if (result5.affectedRows === 0) {
			throw new Error("Error al actualizar datos en la tabla client.");
		}
	}

	static async updateBlock2(clientId: string, goal: string, level: string) {
		const physicLevelId = await User.getPhysicLevelId(level);

		const [result1] = await pool.execute(
			`
			UPDATE clientLevel cl
			JOIN physicLevel pl ON cl.physicLevelId = pl.id
			SET cl.physicLevelId = ?
			WHERE cl.clientID = ?
			`,
			[physicLevelId, clientId]
		);

		if (result1.affectedRows === 0) {
			// throw new Error(level);
			throw new Error("Error al actualizar datos en la tabla clientLevel.");
		}

		const goalId = await User.getGoalId(goal);

		const [result2] = await pool.execute(
			`
			UPDATE clientGoal cg
			JOIN goal g ON cg.goalId = g.id
			SET cg.goalId = ?
			WHERE cg.clientID = ?
			`,
			[goalId, clientId]
		);

		if (result2.affectedRows === 0) {
			throw new Error("Error al actualizar datos en la tabla client goal.");
		}
	}

	static async deleteUser(id: string) {
		const connection = await pool.getConnection();
		try {
			await connection.beginTransaction();
			await connection.execute(`DELETE FROM clientDiet WHERE clientId = ?;`, [
				id,
			]);
			await connection.execute(
				`DELETE FROM clientWorkout WHERE clientId = ?;`,
				[id]
			);
			await connection.execute(
				`DELETE FROM tag WHERE workoutId IN (SELECT id FROM workout WHERE id IN (SELECT workoutId FROM clientWorkout WHERE clientId = ?));`,
				[id]
			);
			await connection.execute(
				`DELETE FROM workout WHERE id IN (SELECT workoutId FROM clientWorkout WHERE clientId = ?);`,
				[id]
			);
			await connection.execute(`DELETE FROM clientGoal WHERE clientId = ?;`, [
				id,
			]);
			await connection.execute(`DELETE FROM clientLevel WHERE clientId = ?;`, [
				id,
			]);
			await connection.execute(`DELETE FROM clientRol WHERE clientId = ?;`, [
				id,
			]);
			await connection.execute(`DELETE FROM journalEntry WHERE clientId = ?;`, [
				id,
			]);
			// Eliminar medidas
			await connection.execute(`DELETE FROM weight WHERE clientId = ?;`, [id]);
			await connection.execute(`DELETE FROM height WHERE clientId = ?;`, [id]);
			await connection.execute(`DELETE FROM neck WHERE clientId = ?;`, [id]);
			await connection.execute(`DELETE FROM chest WHERE clientId = ?;`, [id]);
			await connection.execute(`DELETE FROM leftArm WHERE clientId = ?;`, [id]);
			await connection.execute(`DELETE FROM rightArm WHERE clientId = ?;`, [
				id,
			]);
			await connection.execute(`DELETE FROM leftForearm WHERE clientId = ?;`, [
				id,
			]);
			await connection.execute(`DELETE FROM rightForearm WHERE clientId = ?;`, [
				id,
			]);
			await connection.execute(`DELETE FROM waist WHERE clientId = ?;`, [id]);
			await connection.execute(`DELETE FROM hip WHERE clientId = ?;`, [id]);
			await connection.execute(`DELETE FROM leftleg WHERE clientId = ?;`, [id]);
			await connection.execute(`DELETE FROM rightleg WHERE clientId = ?;`, [
				id,
			]);
			await connection.execute(`DELETE FROM leftcalve WHERE clientId = ?;`, [
				id,
			]);
			await connection.execute(`DELETE FROM rightcalve WHERE clientId = ?;`, [
				id,
			]);
			// Eliminar triggers
			await connection.execute(`DELETE FROM usersex where userid = ?;`, [id]);
			await connection.execute(`DELETE FROM usergoal where clientId = ?;`, [id]);
			await connection.execute(`DELETE FROM userjournal where userId = ?;`, [id]);
			await connection.execute(`DELETE FROM userlevels where clientId = ?;`, [id]);			await connection.execute(`DELETE FROM client WHERE id = ?;`, [id]);
			await connection.commit();
		} catch (error) {
			console.error("Error en las consultas, revirtiendo cambios:", error);
			await connection.rollback();
		} finally {
			connection.release();
		}
	}

	static async getUserSexData() {
		const [result] = await pool.execute(`
		SELECT SUM(CASE WHEN sex = 'M' THEN 1 ELSE 0 END) AS totalMasculinos,
		SUM(CASE WHEN sex = 'F' THEN 1 ELSE 0 END) AS totalFemeninos
		FROM userSex;
		`);
		return result;
	}

	static async getUserJournalData() {
		const [result] = await pool.execute(`
		SELECT SUM(entryCount) AS totalEntries
		FROM userjournal
		GROUP BY userId;
		`);

		return result;
	}

	static async getUserGoalData() {
		const [result] = await pool.execute(`
				SELECT SUM(CASE WHEN _goal = 'Subir de peso' THEN 1 ELSE 0 END) AS "SubirPeso",
				SUM(CASE WHEN _goal = 'Mantener peso' THEN 1 ELSE 0 END) AS "MantenerPeso",
				SUM(CASE WHEN _goal = 'Bajar de peso' THEN 1 ELSE 0 END) AS "BajarPeso"
				FROM userGoal;
	`);
		return result;
	}

	static async getUserLevelData() {
		const [result] = await pool.execute(`
			SELECT SUM(CASE WHEN _level = 'Sedentario' THEN 1 ELSE 0 END) AS "Total_Sedentarios",
			SUM(CASE WHEN _level = 'Ejercicio 2 veces por semana' THEN 1 ELSE 0 END) AS "Total_2_veces_por_semana",
			SUM(CASE WHEN _level = 'Caminata diaria' THEN 1 ELSE 0 END) AS "Caminata_diaria",
			SUM(CASE WHEN _level = '4-5 días de gym' THEN 1 ELSE 0 END) AS "_4_5_días_de_gym",
			SUM(CASE WHEN _level = 'Alto rendimiento' THEN 1 ELSE 0 END) AS "Alto_rendimiento"
			FROM userlevels;
		`);
		return result;
	}
}

export default User;
