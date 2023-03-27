import passport from "passport";
import { redirectProfile } from "../../utils/clientRoutes";


// Google
export const google = passport.authenticate("google", {
    scope: ["profile"],
});

export const googleCallBack = (req, res) => {
    console.log("req.user:", req.user);

    if (req.user.username === null) {
        // Nueva
        res.redirect(`${redirectProfile}/newSession/?token=${req.user.id}`);
    } else {
        // Existente
        res.redirect(`${redirectProfile}/?token=${req.user.id}`);
    }
};
