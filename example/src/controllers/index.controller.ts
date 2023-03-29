import Workout from "../models/Workouts/workouts.model";
import type { IWorkout } from "../interfaces/Workouts.interface";

// En este caso este controlador
// va a devolver los workouts favoritos
// la lógica del query está en el modelo
// pero con la variable "req" es como le pasamos
// el id del usuario

// Gracias al middleware de isAuth, la variable req.user
// va a ser el cliente, con toda su información

// Siempre pon un try {} catch() {} en tus controladores
// Para que asi si hay un error puedas devolver
// un resultado

// Intenta que tus rutas devuelvan siempre un objeto así:

// req.json({
//     data: {}, // un objeto con la información que quieras regresar
//     auth: true or false,
//     msg: "" // cualquier mensaje que quieras añadir
// })

// Ejemplos
// req.json({
//     data: {}, 
//     auth: true
//     msg: "Las claves son incorrectas"
// })

// req.json({
//     data: {
//          workouts: []
//     }, 
//     auth: true
//     msg: ""
// })

export const getFavWorkouts = async (req, res) => {
    try {

        const rowsWorkouts = await Workout.findFavs(req.user.id);

        const workouts: {
            [key: string]: IWorkout
        } = {};

        // En este caso esto ya depende de cada controlador...
        // La logica que tiene cada uno...

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

// otro ejemplo

export const getAllWorkouts = async (req, res) => {
    try {
        const {
            search,
            level,
            frequency,
            type: typeVar
        } = req.query;

        const rowsWorkouts = await Workout.findAll(req.user.id, {
            search,
            level,
            typeVar,
            frequency
        });

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