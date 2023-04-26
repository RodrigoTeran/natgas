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
		const dateGood =
			date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
		const date2 = new Date(date.setDate(date.getDate() + 6));
		const dateGood2 =
			date2.getFullYear() +
			"-" +
			(date2.getMonth() + 1) +
			"-" +
			date2.getDate();

		const [rows] = await pool.execute(
			`SELECT id, aDate, title, content FROM journalEntry WHERE clientId = ? AND aDate BETWEEN ? AND ?;`,
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
		const bitacora: IBitacora = {
			id: this.id,
			aDate: this.aDate,
			title: this.title,
			content: this.content,
			createdAt: new Date(),
			clientId: clientId,
		};

		await pool.execute(
			`INSERT INTO journalEntry(id, aDate, title, content, clientId) VALUES
      (?, ?, ?, ?, ?);`,
			[
				bitacora.id,
				bitacora.aDate,
				bitacora.title,
				bitacora.content,
				bitacora.clientId,
			]
		);

		if (bitacora.title.length == 0 || bitacora.content.length == 0) return null;

		return bitacora;
	}

	// Fetch a single entry
	static async fetchEntry(
		clientId: string,
		id: string
	): Promise<IBitacora | null> {
		const [rows] = await pool.execute(
			`SELECT aDate, title, content FROM journalEntry WHERE clientId = ? AND id = ?;`,
			[clientId, id]
		);
		if (rows.length == 0) return null;
		return rows;
	}

	// Update an entry
	static async updateEntry(
		clientId: string,
		id: string,
		entry: IBitacora
	): Promise<IBitacora | null> {
		const [result] = await pool.execute(
			`UPDATE journalEntry SET aDate = ?, title = ?, content = ? WHERE clientId = ? AND id = ?;`,
			[new Date(entry.aDate), entry.title, entry.content, clientId, id]
		);
		if (result.affectedRows === 0) return null;
		return entry;
	}

	// Delete an entry
	static async deleteEntry(clientId: string, id: string): Promise<boolean> {
		const [result] = await pool.execute(
			`CALL deleteEntry(?, ?);`,
			[clientId, id]
		);
		if (result.affectedRows === 0) return false;
		return true;
	}
}

export default Bitacora;
