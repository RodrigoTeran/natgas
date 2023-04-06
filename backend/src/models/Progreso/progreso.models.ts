import db from "../../db/connection";
import {IBody} from "../../interfaces/Body.interface";

export default class Body {
    constructor () {}
    static async fetchAll(clientId: string,
        {
        table,
        start,
        end
    }: {
        table: string | undefined;
        start: string | undefined;
        end: string | undefined;
    }): Promise<IBody[]> {
        const [rows]  = await db.execute(`
        SELECT measurement
        FROM ` + table + ` b, client
        WHERE client.id = b.clientid
        AND client.id = ?
        AND b.createdAt BETWEEN ? AND ?`, [clientId, start, end]);

    return rows;
    }
}