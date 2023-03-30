// Esto debe de ir primero siempre, no lo quiten
import dotenv from "dotenv";
dotenv.config();

// El middleware de passport
import "./middlewares/passport.middleware";
import { app } from "./server";

app.listen(app.get("port"), () => {
    console.log("Server listening on port:", app.get("port"));
});