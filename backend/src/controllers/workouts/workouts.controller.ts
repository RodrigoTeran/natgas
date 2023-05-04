import Workout from "../../models/Workouts/workouts.model";
import type { IWorkout } from "../../interfaces/Workouts.interface";

export const getAllWorkoutsLogic = async (
	search,
	level,
	frequency,
	typeVar,
	userId
) => {
	try {
		const rowsWorkouts = await Workout.findAll(userId, {
			search,
			level,
			typeVar,
			frequency,
		});

		const workouts: {
			[key: string]: IWorkout;
		} = {};

		for (let i = 0; i < rowsWorkouts.length; i++) {
			const w: any = rowsWorkouts[i];

			let currE: Set<string> | null = null;

			if (workouts[w.id] !== undefined) {
				currE = new Set(workouts[w.id].exercises);
			} else {
				currE = new Set();
			}
			const exerciseName = w.exerciseName;

			currE.add(exerciseName);

			delete w.exerciseName;

			workouts[w.id] = {
				...w,
				exercises: Array.from(currE),
			};
		}

		return { workouts: Object.values(workouts) };
	} catch (error) {
		console.log(error);

		return "Error del servidor";
	}
};

export const getAllFavsLogic = async (userId: string) => {
	try {
		if (userId === undefined) {
			return "Usuario inválido";
		}

		const rowsWorkouts = await Workout.findFavs(userId);

		const workouts: {
			[key: string]: IWorkout;
		} = {};

		for (let i = 0; i < rowsWorkouts.length; i++) {
			const w: any = rowsWorkouts[i];

			let currE: Set<string> | null = null;

			if (workouts[w.id] !== undefined) {
				currE = new Set(workouts[w.id].exercises);
			} else {
				currE = new Set();
			}

			const exerciseName = w.exerciseName;

			currE.add(exerciseName);

			delete w.exerciseName;

			workouts[w.id] = {
				...w,
				exercises: Array.from(currE),
				liked: workouts[w.id]?.liked || w.liked,
			};
		}

		return Object.values(workouts);
	} catch (error) {
		console.log(error);
		return "Error al obtener los workouts";
	}
};

export const likeUnlikeLogic = async (userId: string, workoutId: string) => {
	try {
		if (
			userId === undefined ||
			userId === "" ||
			workoutId === undefined ||
			workoutId === ""
		) {
			return "Datos invalidos";
		}

		const res = await Workout.likeUnlike(userId, workoutId);

		if (!res) {
			return "Error al obtener los workouts";
		}

		return res;
	} catch (error) {
		console.log(error);
		return "Error del servidor";
	}
};

export const createWorkoutLogic = async (
	name,
	description,
	frequency,
	level,
	typeWorkout,
	photosURL,
	exercisesId
) => {
	try {
		let isGood: boolean = true;

		if (name.trim() === "") {
			isGood = false;
		}
		if (description.trim() === "") {
			isGood = false;
		}
		if (photosURL.length === 0) {
			isGood = false;
		}

		if (!isGood) return "Datos inválidos";

		const result = await Workout.create(
			name,
			description,
			frequency,
			level,
			typeWorkout,
			photosURL,
			exercisesId
		);

		return result;
	} catch (error) {
		console.log(error);

		return "Error del servidor";
	}
};

export const getWorkoutLogic = async (
	id: string
) => {
	try {

		if (id.trim() === "") {
			return "Id inválido";
		}

		const workout = await Workout.findById(id);

		if (workout === null) {
			return "Error al obtener el workout";
		}

		return { workout };
	} catch (error) {
		console.log(error);

		return "Error del servidor";
	}
};

export const getMetricsLogic = async () => {
	try {

		const workouts = await Workout.getMetrics();

		if (workouts === null) {
			return "Error al obtener las métricas";
		}

		return { workouts };
	} catch (error) {
		console.log(error);

		return "Error del servidor";
	}
};


export const deleteWorkoutLogic = async (
	id: string
) => {
	try {

		if (id.trim() === "") {
			return "Id inválido";
		}

		const workout = await Workout.delete(id);

		if (typeof workout === "string") {
			return workout;
		}

		return null;
	} catch (error) {
		console.log(error);

		return "Error del servidor";
	}
};

export const updateWorkoutLogic = async (
	workoutId: string,
	name: string,
	description: string,
	frequency: string,
	level: string,
	typeWorkout: string,
	exercisesId: string[],
	photosUrlNew: string[],
	photosUrlOld: string[],
): Promise<boolean | string> => {
	try {
		if (workoutId.trim() === "") {
			return "Id inválido";
		}

		let isGood: boolean = true;

		if (name.trim() === "") {
			isGood = false;
		}
		if (description.trim() === "") {
			isGood = false;
		}
		if (level.trim() === "") {
			isGood = false;
		}
		if (typeWorkout.trim() === "") {
			isGood = false;
		}

		if (!isGood) return "Datos inválidos";

		const workout = await Workout.update(
			workoutId,
			name,
			description,
			frequency,
			level,
			typeWorkout,
			exercisesId,
			photosUrlNew,
			photosUrlOld
		);

		return workout;
	} catch (error) {
		console.log(error);

		return "Error del servidor";
	}
};


export const getFavWorkouts = async (req, res) => {
	try {
		const rowsWorkouts = await Workout.findFavs(req.user.id);

		const workouts: {
			[key: string]: IWorkout;
		} = {};

		for (let i = 0; i < rowsWorkouts.length; i++) {
			const w: any = rowsWorkouts[i];

			let currE: Set<string> | null = null;

			if (workouts[w.id] !== undefined) {
				currE = new Set(workouts[w.id].exercises);
			} else {
				currE = new Set();
			}
			const exerciseName = w.exerciseName;

			currE.add(exerciseName);

			delete w.exerciseName;

			workouts[w.id] = {
				...w,
				exercises: Array.from(currE),
				liked: workouts[w.id]?.liked || w.liked,
			};
		}

		return res.json({
			auth: true,
			msg: "",
			data: {
				workouts: Object.values(workouts),
			},
		});
	} catch (error) {
		console.log(error);

		return res.json({
			auth: true,
			msg: "Error del servidor",
			data: {
				workouts: [],
			},
		});
	}
};

export const likeUnlike = async (req, res) => {
	try {
		const { workoutId } = req.params;

		const data = await likeUnlikeLogic(req.user.id, workoutId)


		if (typeof data === "string") {
			return res.json({
				msg: data,
				data: {},
				auth: true,
			});
		}

		return res.json({
			auth: true,
			msg: "",
			data: {},
		});
	} catch (error) {
		console.log(error);

		return res.json({
			auth: true,
			msg: "Error del servidor",
			data: {},
		});
	}
};

export const getAllWorkouts = async (req, res) => {
	try {
		const { search, level, frequency, typeVar } = req.query;

		const data = await getAllWorkoutsLogic(
			search,
			level,
			frequency,
			typeVar,
			req.user.id
		);

		if (typeof data === "string") {
			return res.json({
				msg: data,
				data: {
					workouts: [],
				},
				auth: true,
			});
		}

		return res.json({
			auth: true,
			msg: "",
			data,
		});
	} catch (error) {
		console.log(error);

		return res.json({
			auth: true,
			msg: "Error del servidor",
			data: {
				workouts: [],
			},
		});
	}
};


export const createWorkout = async (req, res) => {
	try {
		const {
			name,
			description,
			frequency,
			level,
			typeWorkout,
			photosURL,
			exercisesId
		} = req.body;

		const uploadSuccessful = await createWorkoutLogic(
			name,
			description,
			frequency,
			level,
			typeWorkout,
			photosURL,
			exercisesId
		);

		if (typeof uploadSuccessful === "string") {
			return res.json({
				msg: uploadSuccessful,
				data: {
					upload: false
				},
				auth: true,
			});
		}

		return res.json({
			auth: true,
			msg: "",
			data: {
				upload: uploadSuccessful
			},
		});
	} catch (error) {
		console.log(error);

		return res.json({
			auth: true,
			msg: "Error del servidor",
			data: {
				upload: false
			},
		});
	}
};

export const getWorkout = async (req, res) => {
	try {
		const { id } = req.params;

		const data = await getWorkoutLogic(id);

		if (typeof data === "string") {
			return res.json({
				msg: data,
				data: {
					workout: {},
				},
				auth: true,
			});
		}

		return res.json({
			auth: true,
			msg: "",
			data,
		});
	} catch (error) {
		console.log(error);

		return res.json({
			auth: true,
			msg: "Error del servidor",
			data: {
				workout: {},
			},
		});
	}
};

export const getMetrics = async (req, res) => {
	try {

		const data = await getMetricsLogic();

		if (typeof data === "string") {
			return res.json({
				msg: data,
				data: {
					workouts: {},
				},
				auth: true,
			});
		}

		return res.json({
			auth: true,
			msg: "",
			data,
		});
	} catch (error) {
		console.log(error);

		return res.json({
			auth: true,
			msg: "Error del servidor",
			data: {
				workout: {},
			},
		});
	}
};

export const deleteWorkout = async (req, res) => {
	try {
		const { id } = req.params;

		const data = await deleteWorkoutLogic(id);

		if (typeof data === "string") {
			return res.json({
				msg: data,
				data: null,
				auth: true,
			});
		}

		return res.json({
			auth: true,
			msg: "",
			data: null,
		});
	} catch (error) {
		console.log(error);

		return res.json({
			auth: true,
			msg: "Error del servidor",
			data: {
				workout: {},
			},
		});
	}
};

export const updateWorkout = async (req, res) => {
	try {
		const {
			workoutId,
			name,
			description,
			frequency,
			level,
			typeWorkout,
			exercisesId,
			photosUrlNew,
			photosUrlOld
		}: {
			workoutId: string,
			name: string,
			description: string,
			frequency: string,
			level: string,
			typeWorkout: string,
			exercisesId: string[],
			photosUrlNew: string[],
			photosUrlOld: string[],
		} = req.body;

		const data = await updateWorkoutLogic(
			workoutId,
			name,
			description,
			frequency,
			level,
			typeWorkout,
			exercisesId,
			photosUrlNew,
			photosUrlOld
		);

		if (typeof data === "string") {
			return res.json({
				msg: data,
				data: null,
				auth: true,
			});
		}

		return res.json({
			auth: true,
			msg: "",
			data: null,
		});
	} catch (error) {
		console.log(error);

		return res.json({
			auth: true,
			msg: "Error del servidor",
			data: null
		});
	}
};