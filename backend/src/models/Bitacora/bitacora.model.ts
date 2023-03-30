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
		
		const dateGood = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
		const date2 = new Date(date.setDate(date.getDate() + 6));
		const dateGood2 = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate();

		const [rows] = await pool.execute(
			`SELECT aDate, title, content FROM journalEntry WHERE clientId = ? AND aDate BETWEEN ? AND ?;`,
			[clientId, dateGood, dateGood2]
		);
		return rows;
	}

	// Find entry by content, date, or title
	static async findByParam(
		clientId: string,
		aDate: Date,
		title: string,
		content: string
	): Promise<IBitacora[]> {
		const [rows] = await pool.execute(
			`SELECT aDate, title, content FROM journalEntry WHERE clientId = ? AND (aDate = ? OR title = ? OR content = ?);`,
			[clientId, aDate, title, content]
		);
		return rows;
	}

	// Write a new entry to the database
	async newEntry(clientId: string): Promise<IBitacora | null> {
		await pool.execute(
			`INSERT INTO journalEntry(id, aDate, title, content, clientId) VALUES
            (?, ?, ?, ?, ?);`,
			[this.id, this.aDate, this.title, this.content, clientId]
		);

		if (this.title.length == 0 || this.content.length == 0) return null;
	}
}

export default Bitacora;
