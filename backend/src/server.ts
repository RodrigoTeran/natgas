import express from "express";
import session from "express-session";
import passport from "passport";
import cors from "cors";

export const app = express();

// Definimos el puerto
app.set("port", process.env.PORT);

// Para leer el json del body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Definimos seguridad por medio de CORS
app.use(
    cors({
        origin: `${process.env.CLIENT_URL}`,
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "Accept"
        ],
        credentials: true,
    })
);

// Passport para inicio de sesión con Google
app.use(session({
    secret: process.env.SECRET,
    resave: false, // La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió 
    saveUninitialized: false, // Asegura que no se guarde una sesión para una petición que no lo necesita
}));
app.use(passport.initialize());
app.use(passport.session());

// Todas las rutas
import authRoutes from "./routes/auth.routes";
import clientRoutes from "./routes/client.routes";
import bitacoraRoutes from "./routes/bitacora.routes";
import dietsRoutes from "./routes/diet.routes";
import measurementsRoutes from "./routes/measurements.routes";
import workoutsRoutes from "./routes/workouts.routes";
app.use("/auth", authRoutes);
app.use("/client", clientRoutes);
app.use("/bitacora", bitacoraRoutes);
app.use("/diets", dietsRoutes);
app.use("/medidas", measurementsRoutes);
app.use("/workouts", workoutsRoutes);

app.get("*", (_, res) => {
    res.status(404).json({
        msg: "La ruta no existe",
        auth: false,
        data: {}
    });
});