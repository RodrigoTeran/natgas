import pool from "../../db/connection";
import type { IWorkout } from "../../interfaces/Workouts.interface";

class Workout {
    constructor() { }

    static async findFavs(idUser: string): Promise<IWorkout[]> {
        const [rows] = await pool.execute(`
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
                    AND tag.workoutId = workout.id
                    AND clientWorkout.clientId = ?
                    AND clientWorkout.workoutId = workout.id;
            `, [idUser, idUser]);

        return rows;
    }

    static async findAll(idUser: string, {
        search,
        level,
        frequency,
        typeVar
    }: {
        search: string | undefined;
        level: string | undefined;
        frequency: string | undefined;
        typeVar: string | undefined;
    }): Promise<IWorkout[]> {

        const myArr = [idUser];

        if (frequency !== undefined) {
            myArr.push(`%${JSON.stringify(frequency).slice(1, 2)}%`);
        } else {
            myArr.push('%%');
        }
        if (level !== undefined) {
            myArr.push(`%${JSON.stringify(level).slice(1, 2)}%`);
        } else {
            myArr.push('%%');
        }
        if (typeVar !== undefined) {
            myArr.push(`%${JSON.stringify(typeVar).slice(1, 2)}%`);
        } else {
            myArr.push('%%');
        }
        if (search !== undefined) {
            myArr.push(`%${JSON.stringify(search).slice(1, 2)}%`);
        } else {
            myArr.push('%%');
        }

        const [rows] = await pool.execute(`
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
                    AND tag.workoutId = workout.id
                    AND workout.frequency LIKE ?
                    AND workoutLevel.name LIKE ?
                    AND workoutType.name LIKE ?
                    AND workout.description LIKE ?
                ;`, myArr);

        return rows;
    }
}

export default Workout;