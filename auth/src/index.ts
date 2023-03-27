import dotenv from "dotenv";
import "./middlewares/passport.middleware";
dotenv.config();

import { app } from "./server";

app.listen(app.get("port"), () => {
    console.log("Server listening on port:", app.get("port"));
});