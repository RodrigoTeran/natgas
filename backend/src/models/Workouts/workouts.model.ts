import pool from "../../db/connection";
import { uuid } from "uuidv4";
import { deleteImageLogic } from "../../controllers/images/images.controller";
import type { IWorkout } from "../../interfaces/Workouts.interface";

class Workout {
    constructor() { }

    static async create(
        name,
        description,
        frequency,
        level,
        typeWorkout,
        photosURL,
        exercisesId
    ): Promise<boolean> {
        try {
            const idempotencyKeyWorkout = uuid();

            const [rowsLevel] = await pool.execute(`SELECT id FROM workoutLevel WHERE name = ? LIMIT 1;`, [level]);
            const [rowsType] = await pool.execute(`SELECT id FROM workoutType WHERE name = ? LIMIT 1;`, [typeWorkout]);

            if (rowsLevel.length === 0 ||
                rowsType.length === 0) {
                return false;
            }

            const levelId = rowsLevel[0].id;
            const typeId = rowsType[0].id;

            await pool.execute(`INSERT INTO workout(
                id,
                name,
                description,
                frequency,
                workoutLevelId,
                typeId
            ) VALUES
                (?, ?, ?, ?, ?, ?);`, [idempotencyKeyWorkout, name, description, frequency, levelId, typeId]);

            // Images
            for (let i = 0; i < photosURL.length; i++) {
                const idempotencyKeyImage = uuid();
                const src = photosURL[i];

                await pool.execute(`INSERT INTO image(
                    id,
                    src
                    ) VALUES
                    (?, ?);`, [idempotencyKeyImage, src]);

                const idempotencyWorkoutKeyImage = uuid();
                await pool.execute(`INSERT INTO workoutImage(
                    id,
                    idWorkout,
                    imageId
                ) VALUES
                    (?, ?, ?);`, [idempotencyWorkoutKeyImage, idempotencyKeyWorkout, idempotencyKeyImage]);
            }

            // Exercises
            for (let i = 0; i < exercisesId.length; i++) {
                const exerciseId = exercisesId[i];

                await pool.execute(`INSERT INTO tag(
                    workoutId,
                    exerciseId
                ) VALUES
                    (?, ?);`, [idempotencyKeyWorkout, exerciseId]);
            }

            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    };

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

    static async update(
        workoutId,
        name,
        description,
        frequency,
        level,
        typeWorkout,
        exercisesId,
        photosUrlNew,
        photosUrlOld,
    ): Promise<boolean> {
        try {
            const [rowsLevel] = await pool.execute(`SELECT id FROM workoutLevel WHERE name = ? LIMIT 1;`, [level]);
            const [rowsType] = await pool.execute(`SELECT id FROM workoutType WHERE name = ? LIMIT 1;`, [typeWorkout]);

            if (rowsLevel.length === 0 ||
                rowsType.length === 0) {
                return false;
            }

            const levelId = rowsLevel[0].id;
            const typeId = rowsType[0].id;

            await pool.execute(`
                UPDATE workout
                SET
                    name = ?,
                    description = ?,
                    frequency = ?,
                    workoutLevelId = ?,
                    typeId = ?
                WHERE
                    id = ?
            ;`, [name, description, frequency, levelId, typeId, workoutId]);

            // New Images
            for (let i = 0; i < photosUrlNew.length; i++) {
                const idempotencyKeyImage = uuid();
                const src = photosUrlNew[i];

                await pool.execute(`INSERT INTO image(
                    id,
                    src
                    ) VALUES
                    (?, ?);`, [idempotencyKeyImage, src]);

                const idempotencyWorkoutKeyImage = uuid();
                await pool.execute(`INSERT INTO workoutImage(
                    id,
                    idWorkout,
                    imageId
                ) VALUES
                    (?, ?, ?);`, [idempotencyWorkoutKeyImage, workoutId, idempotencyKeyImage]);
            };

            // Old Images
            for (let i = 0; i < photosUrlOld.length; i++) {
                const src = photosUrlOld[i];
                const [rowsImagesOld] = await pool.execute(`SELECT id FROM image WHERE src = ? LIMIT 1;`, [src]);
                if (rowsImagesOld.length === 0) continue;
                const id = rowsImagesOld[0].id;
                const msg = await deleteImageLogic(src);
                if (msg.trim() !== "") {
                    continue;
                };
                await pool.execute(`DELETE FROM workoutImage WHERE workoutImage.imageId = ?;`, [id]);
                await pool.execute(`DELETE FROM image WHERE image.id = ?;`, [id]);
            };

            // Exercises
            // First delete all
            await pool.execute(`DELETE FROM tag WHERE tag.workoutId = ?;`, [workoutId]);

            // Add again
            for (let i = 0; i < exercisesId.length; i++) {
                const exerciseId = exercisesId[i];

                await pool.execute(`INSERT INTO tag(
                    workoutId,
                    exerciseId
                ) VALUES
                    (?, ?);`, [workoutId, exerciseId]);
            };

            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    static async getMetrics(): Promise<IWorkout[]> {
        try {
            const [rows] = await pool.execute(`
                    SELECT
                        workout.name, COUNT(*) as amount
                    FROM
                        clientWorkout,
                        workout
                    WHERE
                        clientWorkout.workoutId = workout.id
                    GROUP BY workout.name
                ;`);

            return rows;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async delete(idWorkout: string): Promise<boolean | string> {
        try {
            // First delete images from Google
            const [rowsImages] = await pool.execute(`
                    SELECT
                        image.src as src,
                        image.id as id
                    FROM
                        image,
                        workoutImage
                    WHERE
                        workoutImage.idWorkout = ?
                        AND image.id = workoutImage.imageId
                ;`, [idWorkout]);

            for (let i = 0; i < rowsImages.length; i++) {
                const src = rowsImages[i].src;
                const id = rowsImages[i].id;
                const msg = await deleteImageLogic(src);

                if (msg.trim() !== "") {
                    return msg;
                };

                await pool.execute(`DELETE FROM workoutImage WHERE workoutImage.imageId = ?;`, [id]);
                await pool.execute(`DELETE FROM image WHERE image.id = ?;`, [id]);
            };

            await pool.execute(`DELETE FROM clientWorkout WHERE clientWorkout.workoutId = ?;`, [idWorkout]);
            await pool.execute(`DELETE FROM tag WHERE tag.workoutId = ?;`, [idWorkout]);
            await pool.execute(`DELETE FROM workout WHERE workout.id = ?;`, [idWorkout]);

            return true;
        } catch (error) {
            console.error(error);
            return "Error al eliminar la rutina";
        };
    };

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
        let thequeryFreq = ``;
        let thequeryLevel = ``;
        let thequeryType = ``;

        if (frequency !== undefined) {
            myArr.push(`${JSON.stringify(frequency).slice(1, frequency.length + 1)}`);
            thequeryFreq = `AND workout.frequency = ?`
        } else {
            myArr.push('%');
            thequeryFreq = `AND workout.frequency LIKE ?`
        }
        if (level !== undefined) {
            myArr.push(`${JSON.stringify(level).slice(1, level.length + 1)}`);
            thequeryLevel = `AND workoutLevel.name = ?`
        } else {
            myArr.push('%');
            thequeryLevel = `AND workoutLevel.name LIKE ?`
        }
        if (typeVar !== undefined) {
            myArr.push(`${JSON.stringify(typeVar).slice(1, typeVar.length + 1)}`);
            thequeryType = `AND workoutType.name = ?`
        } else {
            myArr.push('%');
            thequeryType = `AND workoutType.name LIKE ?`
        }
        if (search !== undefined) {
            myArr.push(`%${JSON.stringify(search).slice(1, search.length + 1)}%`);
        } else {
            myArr.push('%');
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
                    ${thequeryFreq}
                    ${thequeryLevel}
                    ${thequeryType}
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

    static async findById(id: string): Promise<IWorkout | null> {

        const myArr = [];
        myArr.push(id);

        const [rowsWorkout] = await pool.execute(`
                SELECT  
                    workout.id as id,
                    workout.name as name,
                    workout.description as description,
                    workout.frequency as frequency,
                    workoutLevel.name as workoutLevelName,
                    workoutType.name as typeName
                FROM
                    workout,
                    workoutLevel,
                    workoutType
                WHERE
                    workout.workoutLevelId = workoutLevel.id
                    AND workout.typeId = workoutType.id
                    AND workout.id = ?
                LIMIT 1
                ;`, myArr);

        const [rowsImages] = await pool.execute(`
                SELECT  
                    image.src as src
                FROM
                    workout,
                    workoutImage,
                    image
                WHERE
                    workoutImage.idWorkout = workout.id
                    AND workoutImage.imageId = image.id
                    AND workout.id = ?
                ;`, myArr);

        const [rowsExercises] = await pool.execute(`
                SELECT  
                    excercise.id as id,
                    excercise.name as name,
                    excercise.description as description,
                    image.src as src
                FROM
                    workout,
                    excercise,
                    tag,
                    image
                WHERE
                    workout.id = tag.workoutId
                    AND workout.id = ?
                    AND excercise.id = tag.exerciseId
                    AND image.id = excercise.imageId
                ;`, myArr);

        if (rowsWorkout.length != 1) {
            return null;
        }

        const workout = rowsWorkout[0];
        workout["exercises"] = rowsExercises;
        workout["images"] = rowsImages;

        return workout;
    }
}

export default Workout;