import pool from "../../db/connection";
import type { IMeasurement } from "../../interfaces/Measurement.interface";

class Measurement {
    constructor() {}

    static async create(measurement: IMeasurement) {
        const { tableName, clientId, measurement: value, createdAt } = measurement;
        const sql = `INSERT INTO ${tableName}(clientId, measurement, createdAt) VALUES (?, ?, ?);`;
        await pool.execute(sql, [clientId, value, createdAt]);
    }
}

export default Measurement;
