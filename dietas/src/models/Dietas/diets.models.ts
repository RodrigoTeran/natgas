import pool from '../../db/connection';
import type { IDiet } from '../../interfaces/Diet.interface';

export default class Diet {
    constructor () { }

    static async fetchTop3(clientId: string):Promise<IDiet[]> {
        const [rows] = await pool.execute(`SELECT d.id, d.name, d.calories, d.macros
                                            FROM clientDiet cd, diet d
                                            WHERE cd.dietId = d.id
                                            AND cd.clientId = ?
                                            LIMIT 3`, [clientId]);
        return rows;
    }
}