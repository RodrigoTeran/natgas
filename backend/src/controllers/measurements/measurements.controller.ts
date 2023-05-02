import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import pool from "../../db/connection";
import { IMeasurement, IBody } from "../../interfaces/Measurement.interface";
import Measurement from "../../models/Measurements/measurement.model"

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
        res.json({ msg: "", data: newMeasurement, auth: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error del servidor", auth: true, data: {} });
    }
};

export const fetchOne = async (req: any, res: any) => {
    try {
        const {
            table, 
            start,
            end
        } = req.query;

        const measures = await Measurement.fetchOne(req.user.id, {table, start, end});
        const measurements: IBody[] = [];

        for(let i=0; i<measures.length; i++) {
            const m:any = measures[i];

            measurements[i] = {
                ...m
            };
        }

        return res.json({
            msg: "",
            data: measurements,
            auth: true,
        })
    } catch (error) {
        console.error(error);
        return res.json({
            msg: "Error del servidor",
            data: [],
            auth: true,
        })
    }
}

export const update = async (req:any, res: any) => {
    try {

        const {
            table,
            measurement,
            id
        } = req.query;

        await Measurement.update(table, measurement, id);

        return res.json({
            msg: "",
            data: [],
            auth: true,
        })
        
    } catch (error) {
        console.error(error);
        return res.json({
            msg: "Error del servidor",
            data: [],
            auth: true,
        })
    }
}

export const deleteFrom =async (req:any, res: any) => {
    try {
        const {id, table} = req.query;

        await Measurement.delete(id, table);

        return res.json({
            msg: "",
            data: [],
            auth: true,
        })
    } catch (error) {
        console.error(error);
        return res.json({
            msg: "Error del servidor",
            data: [],
            auth: true,
        })
    }
}

export { createMeasurement };
