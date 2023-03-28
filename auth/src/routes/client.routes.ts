import express from "express";

import {
    registerClient
} from "../controllers/client/client.controller";
import {
    isAuth
} from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/register", isAuth, registerClient);

export default router;