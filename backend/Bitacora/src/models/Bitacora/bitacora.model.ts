import pool from "../../db/connection";
import { uuid } from "uuidv4";
import type { IBitacora } from "../../interfaces/Bitacora.interface";

class Bitacora {
	id: string;
	aDate: Date;
	title: string;
	content: string;

	constructor(aDate: Date, title: string, content: string) {
		this.id = uuid();
		this.aDate = aDate;
		this.title = title;
		this.content = content;
	}
    // Find entry by user and week date
	static async findByUser(clientId: string, date: Date): Promise<IBitacora[]> {
		const [rows] = await pool.execute(
			`SELECT aDate, title, content FROM journalEntry WHERE clientId = ? AND aDate BETWEEN ? AND ?;`,
			[clientId, date, date.setDate(date.getDate() + 6)]
		);
        console.log(rows)
        return rows;
	}
    // Write a new entry to the database
	async mewEntry(clientId: string): Promise<IBitacora | null> {

		await pool.execute(
			`INSERT INTO journalEntry(id, aDay, title, content, clientId) VALUES
            (?, ?, ?, ?, ?);`,
			[this.id, this.aDate, this.title, this.content, clientId]
		);

        if(this.title.length == 0 || this.content.length == 0) return null;
	}
}

export default Bitacora;
