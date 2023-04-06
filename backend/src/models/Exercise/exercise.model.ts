import pool from "../../db/connection";
import { v4 as uuid } from "uuid";
import type { IExercise } from "../../interfaces/Exercises.interface";

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

	async newExercise(): Promise<IExercise | null> {
		const idempotencyKeyExercise = uuid();

		await pool.execute(
			`INSERT INTO exercise(id, name, description, imageId) VALUES
            (?, ?, ?, ?);`,
			[idempotencyKeyExercise, this.name, this.description, this.imageId]
		);

		if (this.name.length == 0 || this.description.length == 0) return null;
	}

	// async create(): Promise<IExercise | null> {
	// 	const idempotencyKeyExercise = uuid();
	// 	const sql = `INSERT INTO exercise (id, name, description, imageId) VALUES (?, ?, ?, ?);`;
	// 	const [result] = await pool.execute(sql, [
	// 		idempotencyKeyExercise,
	// 		this.name,
	// 		this.description,
	// 		this.imageId,
	// 	]);
	// 	if ((result as any).affectedRows === 0) return null;
	// 	return {
	// 		id: idempotencyKeyExercise,
	// 		name: this.name,
	// 		description: this.description,
	// 		imageId: this.imageId,
	// 	};
	// }
}

export default Exercise;
