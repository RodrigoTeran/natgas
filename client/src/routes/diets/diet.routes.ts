import express from 'express';
import { getIndex } from '../../../../dietas/src/controllers/index.controller';

const router = express.Router();

router.get('/', getIndex);

export default router;