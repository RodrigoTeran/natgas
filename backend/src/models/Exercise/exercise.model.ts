import pool from "../../db/connection";
import { v4 as uuid } from "uuid";
import type {
	IExercise,
	IauxExercise,
} from "../../interfaces/Exercises.interface";

class Exercise {
	id: string;
	name: string;
	description: string;
	imageId: string;

	constructor(name: string, description: string, imageId: string) {
		this.id = uuid();
		this.name = name;
		this.description = description;
		this.imageId = imageId;
	}

	static async deleteExercise(id: string): Promise<boolean> {
		try {
			// await pool.beginTransaction();

			// Eliminar las etiquetas relacionadas con el ejercicio
			await pool.execute(
				`
			  DELETE FROM tag WHERE exerciseId = ?
			`,
				[id]
			);

			// Eliminar el ejercicio
			const [result] = await pool.execute(
				`
			  DELETE FROM excercise WHERE id = ?
			`,
				[id]
			);

			// Eliminar las imágenes asociadas al ejercicio
			await pool.execute(
				`
			  DELETE FROM image WHERE id = ?
			`,
				[id]
			);

			// await pool.commit();

			if (result.affectedRows === 0) {
				return false;
			}

			return true;
		} catch (error) {
			console.log(error);
		}
	}
	async newExercise(): Promise<IExercise | null> {
		const idempotencyKeyExercise = uuid();

		try {
			await pool.execute(
				`INSERT INTO excercise(id, name, description, imageId) VALUES
				  (?, ?, ?, ?);`,
				[idempotencyKeyExercise, this.name, this.description, this.imageId]
			);
		} catch (error) {
			console.error("Error in newExercise method:", error);
			return null;
		}

		if (this.name.length == 0 || this.description.length == 0) return null;

		return {
			id: idempotencyKeyExercise,
			name: this.name,
			description: this.description,
			imageId: this.imageId,
		};
	}

	async createImage(src: string): Promise<string | null> {
		const idempotencyKeyImage = uuid();
		await pool.execute(`INSERT INTO image(id, src) VALUES (?, ?);`, [
			idempotencyKeyImage,
			src,
		]);

		if (src.length == 0) return null;

		return idempotencyKeyImage;
	}

	static async fetch(exercise: string): Promise<IauxExercise[] | null> {
		let filter: string;

		if (exercise !== undefined) filter = exercise + "%";
		else filter = "%";

		const [rows] = await pool.execute(
			`SELECT e.id AS id, e.name AS name, e.description AS description, e.imageId AS imageId, i.src AS src
			FROM excercise e, image i
			WHERE e.imageId = i.id
			AND e.name LIKE ?`,
			[filter]
		);

		return rows;
	}

	static async update(
		id: string,
		name: string,
		description: string
	): Promise<void> {
		await pool.execute(
			`UPDATE excercise
			SET name = ?,
			description = ?
			WHERE id = ?`,
			[name, description, id]
		);
	}

	static async updateImage(id: string, src: string): Promise<void> {
		await pool.execute(
			`UPDATE image
			SET src = ?
			WHERE id = ?`,
			[src, id]
		);
	}

	static async fetchOne(id: string): Promise<IauxExercise[] | null> {
		const [rows] = await pool.execute(
			`SELECT e.name AS name, e.description AS description, e.imageId AS imageId, i.src AS src
			 FROM excercise e, image i
			 WHERE i.id = e.imageId
			 AND e.id = ?
			`,
			[id]
		);

		return rows;
	}
}
export default Exercise;
