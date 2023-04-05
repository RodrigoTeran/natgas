import { Request, Response } from "express";
import { uuid } from "uuidv4";
import Exercise from "../../models/Exercise/exercise.model";
import pool from "../../db/connection";
import { IExercise } from "../../interfaces/Exercises.interface";

const createExercise = async (req: any, res: Response) => {
	try {
		const { name, description, imageId } = req.body;

		const id = uuid();

		const sql = `Insert into exercise(id, name, description, imageId) VALUES (?,?,?,?);`;
		const [result] = await pool.execute(sql, [id, name, description, imageId]);
		if ((result as any).affectedRows === 0)
			throw new Error("Failed to insert record");
		const newExercise: IExercise = {
			id,
			name: name,
			description: description,
			imageId: imageId,
		};
		res.json({ msg: "", data: newExercise, auth: true });
	} catch (e) {
		console.log(e);
		res.status(500).json({ msg: "Error del servidor", auth: true, data: {} });
	}
};

export { createExercise };
