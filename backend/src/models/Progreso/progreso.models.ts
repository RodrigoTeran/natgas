import db from "../../db/connection";
import {IBody} from "../../interfaces/Body.interface";

export default class Body {
    constructor () {}

    static async fetchAll(clientId: string, table: string): Promise<IBody[]> {

        const [rows] = await db.execute(`
            SELECT measurement
            FROM ?, client
            WHERE client.id = ?.clientid
                AND client.id = ?`, [table, table, clientId]);
        
            return rows;
    }

    static async fetch(clientId: string,
        {
        table,
        start,
        end
    }: {
        table: string | undefined;
        start: Date | undefined;
        end: Date | undefined;
    }): Promise<IBody[]> {
        const [rows]  = await db.execute(`
        SELECT measurement
        FROM ?, client
        WHERE client.id = ?.clientid
        AND client.id = ?
        AND ?.created_at BETWEEN ? AND ?`, [table, table, clientId, table, start, end]);

    return rows;
    }
}