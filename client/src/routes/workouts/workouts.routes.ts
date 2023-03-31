import { WORKOUT_ROUTE } from "../index";
import { IWorkout } from "../../interfaces/Workout.interfaces";
import { getClientIdCache } from "../../cache/auth";

export interface IGetWorkoutsData {
    workouts: IWorkout[]
}

export const getFavWorkouts = async (): Promise<null | IGetWorkoutsData> => {
    try {
        const token = getClientIdCache();

        if (token === null) {
            return null;
        }

        const res = await fetch(`${WORKOUT_ROUTE}/favs`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });
        const data: any = await res.json();

        if (data === null || data === undefined) {
            return null;
        }

        return data;

    } catch (error) {
        console.error(error);
        return null;
    };
}

export const getAllWorkouts = async (query: string): Promise<null | IGetWorkoutsData> => {
    try {
        const token = getClientIdCache();

        if (token === null) {
            return null;
        }

        const res = await fetch(`${WORKOUT_ROUTE}?${query}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });
        const data: any = await res.json();

        if (data === null || data === undefined) {
            return null;
        }

        return data.data;

    } catch (error) {
        console.error(error);
        return null;
    };
}

export const likeUnlikeWorkout = async (workoutId: string): Promise<any> => {
    try {
        const token = getClientIdCache();

        if (token === null) {
            return null;
        }

        const res = await fetch(`${WORKOUT_ROUTE}/like/${workoutId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });
        const data: any = await res.json();

        if (data === null || data === undefined) {
            return null;
        }

        return data;

    } catch (error) {
        console.error(error);
        return null;
    };
}
