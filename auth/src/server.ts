import express from "express";

export const app = express();

console.log("process.env.PORT", process.env.PORT);

app.set("port", process.env.PORT);

app.get("/", (req, res) => {
    res.json({
        msg: "Hola"
    });
});