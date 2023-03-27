import express from "express";
import session from "express-session";
import passport from "passport";

export const app = express();

app.set("port", process.env.PORT);

// Passport
app.use(session({
    secret: process.env.SECRET,
    resave: false, // La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió 
    saveUninitialized: false, // Asegura que no se guarde una sesión para una petición que no lo necesita
}));
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