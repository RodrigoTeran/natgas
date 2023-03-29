import express from 'express';
import { getAll, getAllFavs, getDiet } from '../controllers/index.controller';


const router = express.Router();

router.get('/', getAll);
router.get('/favs', getAllFavs);
router.get('/info', getDiet);

export default router;