import express from "express";
import cors from "cors";

export const app = express();

app.set("port", process.env.PORT);

// Esto debes de tenero para que el cliente
// pueda hacer peticiones
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

// Routes
import indexRoutes from "./routes/index.routes";

// Aqui puedes ponerle el nombre del microservicio
// De esta manera todas las rutas van a empezar con este prefijo
app.use("/nombreMicroservicio", indexRoutes);