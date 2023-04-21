import passport from "passport";
import { OAuth2Client } from "google-auth-library";
import {
	redirectProfileCurrent,
	redirectProfileNew,
} from "../../utils/clientRoutes";
import googleModule from "../../keys/google";

// Google
export const google = passport.authenticate("google", {
    scope: ["profile"],
});

export const googleCallBack = (req, res) => {
    if (req.user.username === null) {
        // Nueva
        res.redirect(`${redirectProfileNew}?token=${req.user.id}`);
    } else {
        // Existente
        res.redirect(`${redirectProfileCurrent}?token=${req.user.id}`);
    }
};