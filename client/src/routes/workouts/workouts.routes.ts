import { WORKOUT_ROUTE } from "../index";
import { IWorkout } from "../../interfaces/Workout.interfaces";
import { getClientIdCache } from "../../cache/auth";

const workoutRoute = `${WORKOUT_ROUTE}/workouts`;

export interface IGetWorkoutsData {
    workouts: IWorkout[]
}

export const getFavWorkouts = async (): Promise<null | IGetWorkoutsData> => {
    try {
        const token = getClientIdCache();

        if (token === null) {
            return null;
        }

        const res = await fetch(workoutRoute + "/favs", {
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

export const getAllWorkouts = async (query: string): Promise<null | IGetWorkoutsData> => {
    try {
        const token = getClientIdCache();

        if (token === null) {
            return null;
        }

        const res = await fetch(workoutRoute + "?" + query, {
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

        console.log(data.data);

        return data.data;

    } catch (error) {
        console.error(error);
        return null;
    };
}
