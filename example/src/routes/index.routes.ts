import express from "express";

import {
    getFavWorkouts,
    getAllWorkouts
} from "../controllers/index.controller";
import {
    isAuth
} from "../middlewares/auth.middleware";

const router = express.Router();

// Protejemos las rutas con el middleware de isAuth
// Ejemplos de rutas con parámetros
// router.get("/ruta/:param1/:param2", isAuth, getFavWorkouts);

// En el controlador se accederían así
// const {param1, param2} = req.params;

// Estas son unas rutas de ejemplo
router.get("/favs", isAuth, getFavWorkouts);
router.get("/", isAuth, getAllWorkouts);

export default router;