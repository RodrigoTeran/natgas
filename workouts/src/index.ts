import dotenv from "dotenv";
dotenv.config();

import { app } from "./server";

app.listen(app.get("port"), () => {
    console.log("Server listening on port:", app.get("port"));
});