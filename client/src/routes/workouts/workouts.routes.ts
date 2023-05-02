import { WORKOUT_ROUTE } from "../index";
import { IWorkout, ICompleteWorkout } from "../../interfaces/Workout.interfaces";
import { getClientIdCache } from "../../cache/auth";
import { IData } from "../routes.types";

export interface IGetWorkoutsData {
	workouts: IWorkout[];
}

// Messages complete
export const getFavWorkouts =
	async (): Promise<null | IData<IGetWorkoutsData>> => {
		try {
			const token = getClientIdCache();

			if (token === null) {
				return null;
			}

			const res = await fetch(`${WORKOUT_ROUTE}/favs`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: token,
				},
			});
			const data: any = await res.json();

			if (data === null || data === undefined) {
				return null;
			}

			return data;
		} catch (error) {
			console.error(error);
			return null;
		}
	};

// Messages complete
export const getAllWorkouts = async (
	query: string
): Promise<null | IData<IGetWorkoutsData>> => {
	try {
		const token = getClientIdCache();

		if (token === null) {
			return null;
		}

		const res = await fetch(`${WORKOUT_ROUTE}?${query}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		});
		const data: any = await res.json();

		if (data === null || data === undefined) {
			return null;
		}

		// return data.data;
		return data;
	} catch (error) {
		console.error(error);
		return null;
	}
};

// Messages complete
export const likeUnlikeWorkout = async (
	workoutId: string
): Promise<IData<any> | null> => {
	try {
		const token = getClientIdCache();

		if (token === null) {
			return null;
		}

		const res = await fetch(`${WORKOUT_ROUTE}/like/${workoutId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		});
		const data: any = await res.json();

		if (data === null || data === undefined) {
			return null;
		}

		return data;
	} catch (error) {
		console.error(error);
		return null;
	}
};

// Create workout
export interface IBodyCreateWorkout {
	name: string,
	description: string,
	frequency: string,
	level: string,
	typeWorkout: string,
	photosURL: string[],
	exercisesId: string[]
}
export const createWorkoutRoute = async (
	body: IBodyCreateWorkout
): Promise<IData<any> | null> => {
	try {
		const token = getClientIdCache();

		if (token === null) {
			return null;
		}

		const res = await fetch(`${WORKOUT_ROUTE}/create`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
			body: JSON.stringify(body)
		});
		const data: any = await res.json();

		if (data === null || data === undefined) {
			return null;
		}

		return data;
	} catch (error) {
		console.error(error);
		return null;
	}
};

export interface IGetWorkoutData {
	workout: ICompleteWorkout;
}

// Messages complete
export const getWorkout = async (
	id: string
): Promise<null | IData<IGetWorkoutData>> => {
	try {
		const token = getClientIdCache();

		if (token === null) {
			return null;
		}

		const res = await fetch(`${WORKOUT_ROUTE}/rutina/${id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		});
		const data: any = await res.json();

		if (data === null || data === undefined) {
			return null;
		}

		return data;
	} catch (error) {
		console.error(error);
		return null;
	}
};

// Messages complete
export const deleteWorkout = async (
	id: string
): Promise<null | IData<null>> => {
	try {
		const token = getClientIdCache();

		if (token === null) {
			return null;
		}

		const res = await fetch(`${WORKOUT_ROUTE}/eliminar-rutina/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		});
		const data: any = await res.json();

		if (data === null || data === undefined) {
			return null;
		}

		return data;
	} catch (error) {
		console.error(error);
		return null;
	}
};