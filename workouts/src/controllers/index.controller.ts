import Workout from "../models/Workouts/workouts.model";
import type { IWorkout } from "../interfaces/Workouts.interface";

export const getWorkouts = async (req, res) => {
    try {

        const rowsWorkouts = await Workout.find(req.user.id);

        const workouts: {
            [key: string]: IWorkout
        } = {};

        for (let i = 0; i < rowsWorkouts.length; i++) {
            const w: any = rowsWorkouts[i];

            let currE: Set<string> | null = null;

            if (workouts[w.id] !== undefined) {
                currE = new Set(workouts[w.id].exercises);
            } else {
                currE = new Set()
            }
            const exerciseName = w.exerciseName;

            currE.add(exerciseName);

            delete w.exerciseName;

            workouts[w.id] = {
                ...w,
                exercises: Array.from(currE),
                liked: workouts[w.id]?.liked || w.liked
            }
        }

        return res.json({
            auth: true,
            msg: "",
            data: {
                workouts: Object.values(workouts)
            }
        });
    } catch (error) {

        console.log(error);

        return res.json({
            auth: true,
            msg: "",
            data: {
                workouts: []
            }
        });
    }
}