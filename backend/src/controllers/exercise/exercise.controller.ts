// import { Request, Response } from "express";
// import { uuid } from "uuidv4";
import Exercise from "../../models/Exercise/exercise.model";
import pool from "../../db/connection";
// import { IExercise } from "../../interfaces/Exercises.interface";

export const newExercise = async (req, res) => {
	const { name, description, imageSrc } = req.body;
	try {
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
		console.log("Created exercise:", createdExercise); // Add this line
		res.json({ msg: "", data: {}, auth: true });
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: "Error del servidor", auth: true, data: {} });
	}
};
