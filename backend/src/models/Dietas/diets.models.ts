import pool from '../../db/connection';
import type { IDiet } from '../../interfaces/Diet.interface';

export default class Diet {
    constructor () { }

    static async findAll({
        calories,
        ingredient
    }: {
        calories: string | undefined;
        ingredient: string | undefined;
    }):Promise<IDiet[]> {
        const myArray = [];

        if(calories != "0") {
            myArray.push(`${JSON.stringify(calories).slice(1, JSON.stringify(calories).length - 1)}`);
        } else{
            myArray.push('%');
        }
        
        if(ingredient !== undefined) {
            myArray.push(`${JSON.stringify(ingredient).slice(1, JSON.stringify(ingredient).length - 1)}%`);
        } else {
            myArray.push('%');
        }
        
        const [rows] = await pool.execute(`
            SELECT DISTINCT d.id AS id, d.name AS name, d.calories AS calories, d.macros AS macros
            FROM diet d, ingredient i
            WHERE d.id = i.dietId
            AND d.calories LIKE ?
            AND i.name LIKE ?`, myArray);
    
        return rows;
    }

    static async findAllFavs(clientId: string, {
        calories,
        ingredient
    }:
        {
            calories: string | undefined;
            ingredient: string | undefined;
        }
    ):Promise<IDiet[]> {  
        const myArray = [clientId];

        if(calories != "0") {
            myArray.push(`${JSON.stringify(calories).slice(1, JSON.stringify(calories).length - 1)}`);
        } else{
            myArray.push('%');
        }
        
        if(ingredient !== undefined) {
            myArray.push(`${JSON.stringify(ingredient).slice(1, JSON.stringify(ingredient).length - 1)}%`);
        } else {
            myArray.push('%');
        }
        
        const [rows] = await pool.execute(`
            SELECT DISTINCT d.id AS id, d.name AS name, d.calories AS calories, d.macros AS macros
            FROM clientDiet cd, diet d, ingredient i
            WHERE cd.dietId = d.id
            AND d.id = i.dietId
            AND cd.clientId = ?
            AND d.calories LIKE ?
            AND i.name LIKE ?`, myArray);
        return rows;
    }

    static async fetchTop3(clientId: string):Promise<IDiet[]> {
        const [rows] = await pool.execute(`
            SELECT d.id AS id, d.name AS name, d.calories AS calories, d.macros AS macros
            FROM clientDiet cd, diet d
            WHERE cd.dietId = d.id
            AND cd.clientId = ?
            LIMIT 3`, [clientId]);
        return rows;
    }

    static async findCalories():Promise<IDiet[]> {
        const [rows] = await pool.execute(`
            SELECT DISTINCT calories
            FROM diet`);
        return rows;
    }

    static async findInfo(dietId: string): Promise<IDiet[]> {
        const [rows] = await pool.execute(`
            SELECT DISTINCT d.id AS id, d.name AS name, d.calories AS calories, d.macros AS macros, d.micros AS micros, i.name AS ingredient, i.quantity AS quantity, i.unit AS unit
            FROM diet d, ingredient i, clientDiet cd
            WHERE d.id = i.dietId
                AND d.id = ?`, [dietId]);
        return rows;
    }

    static async isFav(clientId: string): Promise<IDiet[]>{
        const [rows] = await pool.execute(`
            SELECT d.id AS id
            FROM clientDiet cd, diet d
            WHERE cd.dietId = d.id
            AND cd.clientId = ?`, [clientId]);

        return rows;     
    }

    static async addFav(clientId: string, dietId: string): Promise<void>{
        await pool.execute(`
            INSERT INTO clientDiet(clientId, dietId) VALUES (?, ?)`, [clientId, dietId]);
    }
    
    static async removeFav(clientId: string, dietId: string): Promise<void>{
        await pool.execute(`
            DELETE FROM clientDiet
            WHERE clientId = ?
            AND dietId = ?`, [clientId, dietId]);
    }


    static async agregarDieta(id: string, name: string, calories: string, macros: JSON, micros: JSON): Promise<void> {
        await pool.execute(`
            CALL agregarDieta(?, ?, ?, ?, ?)`, [id, name, calories, JSON.stringify(macros), JSON.stringify(micros)]);
    }

    static async agregarIng(id: string, name: string, quantity: string, unit: string, dietId: string): Promise<void> {
        await pool.execute(`
            CALL agregarIngrediente(?, ?, ?, ?, ?)`, [id, name, quantity, unit, dietId]);
    }

    static async deleteIng(dietId: string): Promise<void> {
        await pool.execute(`
        DELETE from ingredient
        Where dietId = ?`, [dietId]);
    }

    static async updateDiet(id: string, name: string, calories: string, macros: JSON, micros: JSON) {
        await pool.execute(`
            UPDATE diet
            SET name = ?,
            calories = ?,
            macros = ?,
            micros = ?
            WHERE id = ?`, [name, calories, JSON.stringify(macros), JSON.stringify(micros), id]);
    }
}
