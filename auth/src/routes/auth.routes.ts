import express from "express";
import passport from "passport";

import {
    google,
    googleCallBack
} from "../controllers/google/google.controller";

const router = express.Router();

router.get("/google", google);
router.get("/google/callback", passport.authenticate("google"), googleCallBack);

export default router;