import express from "express";
import cors from "cors";

export const app = express();

app.set("port", process.env.PORT);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
import routes from "./routes/bitacora.routes";
app.use(routes);