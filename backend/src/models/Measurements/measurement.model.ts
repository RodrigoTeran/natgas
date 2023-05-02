import pool from "../../db/connection";
import { v4 as uuid } from "uuid";
import type { IMeasurement, IBody } from "../../interfaces/Measurement.interface";


class Measurement {
  id: string;
  measurement: number;
  clientId: string;
  tableName: string = "neck" || "chest" || "leftArm" || "rightArm" || "leftForearm" || "rightForearm" || "waist" || "hip" || "leftLeg" || "rightLeg" || "rightCalve" || "leftCalve";

  constructor(clientId: string, measurement: number) {
    this.id = uuid();
    this.clientId = clientId;
    this.measurement = measurement;
  }

  async create(): Promise<IMeasurement | null> {
    const idempotencyKeyMeasurement = uuid();
    const sql = `INSERT INTO ${this.tableName}(id, clientId, measurement) VALUES (?, ?, ?);`;
    const [result] = await pool.execute(sql, [idempotencyKeyMeasurement, this.clientId, this.measurement]);
    if ((result as any).affectedRows === 0) return null;
    return {
      id: idempotencyKeyMeasurement,
      clientId: this.clientId,
      measurement: this.measurement,
      createdAt: new Date(),
      tableName: this.tableName,
    };
  }

  static async fetchOne(clientId: string,
  {
    table,
    start,
    end
  }: {
    table: string | undefined;
    start: string | undefined;
    end: string | undefined;
  }): Promise<IBody[]> {
    let info;
    if(table === "weight") info = "measurementWeight";
    else info = "measurement";
    
    const [rows]  = await pool.execute(`
      SELECT b.id AS id, b.${info} AS measurement, b.createdAt AS date
      FROM ${table} b, client
      WHERE client.id = b.clientid
      AND client.id = ?
      AND b.createdAt BETWEEN ? AND ?`, [clientId, start, end]);

    return rows;
  }

  static async update(table: string, measurement:string, id:string) {
    await pool.execute(`
      UPDATE ` + table + `
      SET measurement = ?
      WHERE id = ?`, [measurement, id]);
  }


  static async delete(id: string, table:string) {
    await pool.execute(`DELETE FROM ` + table +` WHERE id = ?`, [id]);
  }
}

export default Measurement;

