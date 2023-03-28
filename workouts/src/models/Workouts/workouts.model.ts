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
                    excercise.name as exerciseName
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
                    AND clientWorkout.clientId = ?
                    AND clientWorkout.workoutId = workout.id
                    AND tag.exerciseId = excercise.id
                    AND tag.workoutId = workout.id;
            `, [idUser]);
        const [rowsWorkoutsAll] = await pool.execute(`
                SELECT  
                    workout.id as id,
                    workout.name as name,
                    workout.description as description,
                    workout.frequency as frequency,
                    workoutLevel.name as workoutLevelName,
                    workoutType.name as typeName,
                    excercise.name as exerciseName
                FROM
                    workout,
                    workoutLevel,
                    workoutType,
                    excercise,
                    tag
                WHERE
                    workout.workoutLevelId = workoutLevel.id
                    AND workout.typeId = workoutType.id
                    AND tag.exerciseId = excercise.id
                    AND tag.workoutId = workout.id;
        `);

        return [rowsWorkoutsFav, rowsWorkoutsAll];
    }
}

export default Workout;