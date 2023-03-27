import express from "express";
import passport from "passport";

export const app = express();

app.set("port", process.env.PORT);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
import routes from "./routes/auth.routes";
app.use("/auth", routes);

app.get("/", (req, res) => {
    res.json({
        msg: "Hola"
    });
});