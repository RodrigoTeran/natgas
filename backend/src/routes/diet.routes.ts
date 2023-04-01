import express from 'express';
import { getAll, getAllFavs, getDiet, setDietStatus } from '../controllers/diets/diets.controller';
import { isAuth } from "../middlewares/auth.middleware"

const router = express.Router();

router.get('/', isAuth, getAll);
router.get('/favs', isAuth, getAllFavs);
router.get('/info', isAuth, getDiet);
router.get('/status', isAuth, setDietStatus);

export default router;