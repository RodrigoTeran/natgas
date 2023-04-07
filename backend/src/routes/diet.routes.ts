import express from 'express';
import { getAll, getAllFavs, getDiet, setDietStatus } from '../controllers/diets/diets.controller';
import {
    createService
} from "../middlewares/roles.middleware";

const router = express.Router();

router.get('/', createService("Consultar dietas"), getAll);
router.get('/favs', createService("Consultar dietas"), getAllFavs);
router.get('/info', createService("Consultar dietas"), getDiet);
router.get('/status', createService("Añadir/eliminar dieta a favoritos"), setDietStatus);

export default router;