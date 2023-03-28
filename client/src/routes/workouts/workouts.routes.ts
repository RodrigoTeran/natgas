import { WORKOUT_ROUTE } from "../index";
import { IWorkout } from "../../interfaces/Workout.interfaces";
import { getClientIdCache } from "../../cache/auth";

const workoutRoute = `${WORKOUT_ROUTE}/workouts`;

export interface IGetWorkoutsData {
    workoutsFav: IWorkout[],
    workoutsAll: IWorkout[]
}

export const getWorkouts = async (): Promise<null | IGetWorkoutsData> => {
    try {
        const token = getClientIdCache();

        if (token === null) {
            return null;
        }

        const res = await fetch(workoutRoute, {
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

        const workoutsFav: {
            [key: string]: IWorkout
        } = {};

        for (let i = 0; i < data.data.workoutsFav.length; i++) {
            const w: any = data.data.workoutsFav[i];
            const exerciseName = data.data.workoutsFav[i].exerciseName;
            let currE: Set<string> | null = null;
            if (workoutsFav[w.id] !== undefined) {
                currE = workoutsFav[w.id].exercises;
            } else {
                currE = new Set()
            }

            currE.add(exerciseName);

            delete w.exerciseName;

            workoutsFav[w.id] = {
                ...w,
                exercises: currE
            }
        }

        const workoutsAll: {
            [key: string]: IWorkout
        } = {};

        for (let i = 0; i < data.data.workoutsAll.length; i++) {
            const w: any = data.data.workoutsAll[i];
        
            let currE: Set<string> | null = null;
            if (workoutsAll[w.id] !== undefined) {
                currE = workoutsAll[w.id].exercises;
            } else {
                currE = new Set()
            }
            const exerciseName = data.data.workoutsAll[i].exerciseName;


            currE.add(exerciseName);

            delete w.exerciseName;

            workoutsAll[w.id] = {
                ...w,
                exercises: currE
            }
        }

        return {
            workoutsFav: Object.values(workoutsFav),
            workoutsAll: Object.values(workoutsAll)
        };
    } catch (error) {
        console.error(error);
        return null;
    };
}