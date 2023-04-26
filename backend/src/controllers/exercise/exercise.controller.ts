// import { Request, Response } from "express";
// import { uuid } from "uuidv4";
import Exercise from "../../models/Exercise/exercise.model";
import pool from "../../db/connection";
import { IauxExercise } from "../../interfaces/Exercises.interface";
import { exec } from "child_process";

export const newExercise = async (req, res) => {
	try {
		const { name, description, imageSrc } = req.body;
		const newExercise = new Exercise(name, description, "");
		const imageId = await newExercise.createImage(imageSrc);
		if (imageId === null) {
			res
				.status(400)
				.json({ msg: "Error creating image", auth: true, data: {} });
			return;
		}
		newExercise.imageId = imageId;
		const createdExercise = await newExercise.newExercise();
		res.json({ msg: "", data: {}, auth: true });
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: "Error del servidor", auth: true, data: {} });
	}
};

export const deleteExercise = async (req, res) => {
	try {
		const { id } = req.params;

		await Exercise.deleteExercise(id);
		return res.json({
			msg: "",
			data: [],
			auth: true,
		});
	} catch (e) {
		console.log(e);
		return res.json({
			msg: "El ejercicio no pudo ser eliminado",
			data: [],
			auth: true,
		});
	}
};

export const getAll = async (req: any, res: any) => {
	try {
		const { filtro } = req.query;

		const rowsExercises = await Exercise.fetch(filtro);

		const exercises: {
			[key: string]: IauxExercise;
		} = {};

		for (let i = 0; i < rowsExercises.length; i++) {
			const e = rowsExercises[i];

			exercises[e.id] = {
				...e,
			};
		}

		return res.json({
			msg: "",
			data: {
				data: Object.values(exercises),
			},
			auth: true,
		});
	} catch (error) {
		console.log(error);
		return res.json({
			msg: "Error del servidor",
			data: {
				data: [],
			},
			auth: true,
		});
	}
};

export const update = async (req: any, res: any) => {
	try {
		const { id, name, description, imageId, src } = req.body;

		await Exercise.updateImage(imageId, src);

		await Exercise.update(id, name, description);

		return res.json({
			msg: "",
			data: [],
			auth: true,
		});
	} catch (error) {
		console.log(error);
		return res.json({
			msg: "Error del servidor",
			data: {
				data: [],
			},
			auth: true,
		});
	}
};

export const fetchOne = async (req: any, res: any) => {
	try {
		const { id } = req.query;

		const rowExercise = await Exercise.fetchOne(id);

		let exercise = {} as IauxExercise;
		const e: any = rowExercise[0];

		exercise = {
			...e,
			id: "",
		};

		return res.json({
			msg: "",
			data: exercise,
			auth: true,
		});
	} catch (error) {
		console.log(error);
		return res.json({
			msg: "Error del servidor",
			data: {
				data: [],
			},
			auth: true,
		});
	}
};
