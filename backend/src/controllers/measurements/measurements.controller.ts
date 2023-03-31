import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import pool from "../../db/connection";
import { IMeasurement } from "../../interfaces/Measurement.interface";

const createMeasurement = async (req: any, res: Response) => {
    try {
        const { measurement, tableName } = req.body;

        const id = uuid();
        const sql = `INSERT INTO ${tableName}(id, clientId, measurement) VALUES (?, ?, ?);`;
        const [result] = await pool.execute(sql, [id, req.user.id, measurement]);
        if ((result as any).affectedRows === 0) throw new Error("Failed to insert record");
        const newMeasurement: IMeasurement = {
            id,
            clientId: req.user.id,
            measurement: measurement,
            createdAt: new Date(),
            tableName,
        };
        res.json({ success: true, data: newMeasurement });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export { createMeasurement };
