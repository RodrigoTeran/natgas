import express from "express";
import passport from "passport";
import {
    google,
    googleCallBack
} from "../controllers/google/google.controller";
import {
    getAuth
} from "../controllers/index.controller";
import {
    isAuth
} from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/", isAuth, getAuth);
router.get("/google", google);
router.get("/google/callback", passport.authenticate("google"), googleCallBack);

export default router;