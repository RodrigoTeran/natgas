import passport from "passport";
import { redirectProfile } from "../../utils/clientRoutes";


// Google
export const google = passport.authenticate("google", {
    scope: ["profile"],
});

export const googleCallBack = (req, res) => {
    if (req.user.tempToken) {
        // tiene un tempToken
        // Mandar el correo
        res.redirect(`${redirectProfile}/newSession/?token=${req.user.tempToken}`);
    } else {
        // no tiene tempToken
        res.redirect(`${redirectProfile}/?token=${req.user.token}`);
    }
};
