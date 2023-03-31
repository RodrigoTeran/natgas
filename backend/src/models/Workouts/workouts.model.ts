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

    static async likeUnlike(idUser: string, idWorkout: string): Promise<boolean> {
        const myArr = [idUser, idWorkout];
        try {
            const [rows] = await pool.execute(`
                    SELECT
                        *
                    FROM
                        clientWorkout
                    WHERE
                        clientWorkout.clientId = ?
                        AND clientWorkout.workoutId = ?
                ;`, myArr);

            const [rowsCheckExistance] = await pool.execute(`
                    SELECT
                        *
                    FROM
                        workout
                    WHERE
                        workout.id = ?
                ;`, [idWorkout]);

            if (rowsCheckExistance.length === 0) return false // No existe ese id

            if (rows.length === 0) {
                // No ha habido like
                await pool.execute(`
                    INSERT INTO clientWorkout(clientId, workoutId)
                    VALUES (?, ?)
                ;`, myArr);

                return true;
            } else {
                // Ha habido like
                await pool.execute(`
                    DELETE FROM
                        clientWorkout
                    WHERE
                        clientWorkout.clientId = ?
                        AND clientWorkout.workoutId = ?
                ;`, myArr);
                return true;
            }
        } catch (error) {
            console.log(error);
            return false;
        }

    };

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

        const myArr = [];

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
                    AND tag.workoutId = workout.id
                    AND workout.frequency LIKE ?
                    AND workoutLevel.name LIKE ?
                    AND workoutType.name LIKE ?
                    AND workout.name LIKE ?
                ;`, myArr);

        const [rowsLiked] = await pool.execute(`
                    SELECT  
                        *
                    FROM
                        clientWorkout
                    WHERE clientWorkout.clientId = ?
                ;`, [idUser]);


        for (let i = 0; i < rows.length; i++) {
            let likedV = false;

            for (let j = 0; j < rowsLiked.length; j++) {
                const liked = rowsLiked[j];
                const row = rows[i];

                if (row.id === liked.workoutId) {
                    likedV = true;
                }
            }
            rows[i] = { ...rows[i], liked: likedV }
        }

        return rows;
    }
}

export default Workout;