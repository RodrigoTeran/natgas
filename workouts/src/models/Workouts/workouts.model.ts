import pool from "../../db/connection";
import type { IWorkout } from "../../interfaces/Workouts.interface";

class Workout {
    constructor() { }

    static async find(idUser: string): Promise<IWorkout[]> {
        const [rowsWorkoutsFav] = await pool.execute(`
                SELECT  
                    workout.id as id,
                    workout.name as name,
                    workout.description as description,
                    workout.frequency as frequency,
                    workoutLevel.name as workoutLevelName,
                    workoutType.name as typeName,
                    excercise.name as exerciseName,
                    IF(clientWorkout.clientId = ? AND clientWorkout.workoutId = workout.id, true, false) as liked
                FROM
                    workout,
                    workoutLevel,
                    workoutType,
                    clientWorkout,
                    excercise,
                    tag
                WHERE
                    workout.workoutLevelId = workoutLevel.id
                    AND workout.typeId = workoutType.id
                    AND tag.exerciseId = excercise.id
                    AND tag.workoutId = workout.id;
            `, [idUser]);

        return rowsWorkoutsFav;
    }
}

export default Workout;