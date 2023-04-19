import express from 'express';
import { getAll, getAllFavs, getDiet, setDietStatus, postDiet, updateDiet } from '../controllers/diets/diets.controller';
import {
    createService
} from "../middlewares/roles.middleware";

const router = express.Router();

router.get('/', createService("Consultar dietas"), getAll);
router.get('/favs', createService("Consultar dietas"), getAllFavs);
router.get('/info', createService("Consultar dietas"), getDiet);
router.get('/status', createService("Añadir/eliminar dieta a favoritos"), setDietStatus);
router.post('/', createService("Añadir dieta"), postDiet);
router.post('/edit', createService("Editar dieta"), updateDiet)

export default router;