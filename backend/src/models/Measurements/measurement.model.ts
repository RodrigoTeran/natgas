import pool from "../../db/connection";
import { v4 as uuid } from "uuid";
import type { IMeasurement } from "../../interfaces/Measurement.interface";

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
}

export default Measurement;

