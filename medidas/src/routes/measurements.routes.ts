import express from "express";

import {
    insertMedidas
} from "../controllers/index.controller";
import {
    isAuth
} from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/", isAuth, insertMedidas);

export default router;