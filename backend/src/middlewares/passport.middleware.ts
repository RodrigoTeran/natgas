import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import GOOGLE from "../keys/google";
import User from "../models/User/user.model";

import { callBackAuthGoogle } from "../utils/clientRoutes";

// Strategies Methods
passport.serializeUser((user: any, cb) => {
    cb(null, user.id);
});

passport.deserializeUser((id: any, cb) => {
    User.findById(id).then((user) => {
        cb(null, user);
    });
});

// Google Strategy
passport.use(
    new Strategy(
        {
            clientID: GOOGLE.clientID,
            clientSecret: GOOGLE.clientSecret,
            callbackURL: callBackAuthGoogle,
        },
        async (_, __, profile: any, cb: any) => {
            // Check if user already exists in our DB
            const currentUser = await User.findOne(profile.id);
            const firstName = profile.name.givenName;
            const lastName = profile.name.familyName;
            if (currentUser === null) {
                // Create user
                const newUser = new User(currentUser);
                const savedUser = await newUser.save(firstName, lastName, profile.id);
                if (savedUser === null) {
                    cb(null, null);
                    return;
                }
                cb(null, savedUser);
                return;
            }

            // Log-in
            cb(null, currentUser);
        }
    )
);