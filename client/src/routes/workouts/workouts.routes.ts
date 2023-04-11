import { WORKOUT_ROUTE } from "../index";
import { IWorkout } from "../../interfaces/Workout.interfaces";
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
