import express from 'express';
import { getAll, getAllFavs, getDiet } from '../controllers/index.controller';
import {isAuth} from "../middlewares/auth.middleware"


const router = express.Router();

router.get('/',isAuth, getAll);
router.get('/favs',isAuth, getAllFavs);
router.get('/info',isAuth, getDiet);

export default router;