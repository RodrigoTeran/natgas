import pool from "../../db/connection";
import { uuid } from "uuidv4";
import type { IBitacora, IBitacoraAux } from "../../interfaces/Bitacora.interface";

class Bitacora {
	id: string;
	title: string;
	content: string;

	constructor(title: string, content: string) {
		this.id = uuid();
		this.title = title;
		this.content = content;
	}

	static async fetchAll (clientId: string): Promise<IBitacora>{
		const rows = pool.execute(
			`
			SELECT je.createdAt, je.title, je.content
			FROM journalentry as je
			WHERE je.clientId = ?
			`
			, [clientId]
		)
		return rows
	}

	// Find entry by user and week date
	static async findByUser(
		clientId: string,
		date: Date,
		title?: string,
		content?: string
	): Promise<IBitacora[]> {
		
		const dateGood =
			date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " 00:00:00";
			
		const date2 = new Date(date.setDate(date.getDate() + 6));
		const dateGood2 =
			date2.getFullYear() +
			"-" +
			(date2.getMonth() + 1) +
			"-" +
			date2.getDate() + " 23:59:59";
		
		const [rows] = await pool.execute(
			`SELECT id, createdAt, title, content 
				FROM journalEntry 
				WHERE clientId = ? AND createdAt BETWEEN ? AND ? AND (title LIKE ? OR content LIKE ?);`,
			[clientId, dateGood, dateGood2, `%${title}%`, `%${content}%`]
		);
		return rows;
	}

	// Write a new entry to the database
	async newEntry(clientId: string): Promise<IBitacoraAux | null> {
		const bitacora: IBitacoraAux = {
			id: this.id,
			title: this.title,
			content: this.content,
			clientId: clientId,
		};

		await pool.execute(
			`INSERT INTO journalEntry(id, title, content, clientId) VALUES
      			(?, ?, ?, ?);`,
			[
				this.id,
				this.title,
				this.content,
				clientId,
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
			`SELECT createdAt, title, content FROM journalEntry WHERE clientId = ? AND id = ?;`,
			[clientId, id]
		);
		if (rows.length == 0) return null;
		return rows;
	}

	// Update an entry
	static async updateEntry(
		clientId: string,
		id: string,
		date: Date,
		entry: IBitacora
	): Promise<IBitacora | null> {
		const [result] = await pool.execute(
			`UPDATE journalEntry SET title = ?, content = ?, createdAt = ? WHERE clientId = ? AND id = ?;`,
			[entry.title, entry.content, date, clientId, id]
		);
		if (result.affectedRows === 0) return null;
		return entry;
	}

	// Delete an entry
	static async deleteEntry(clientId: string, id: string): Promise<boolean> {
		const [result] = await pool.execute(`CALL deleteEntry(?, ?);`, [
			clientId,
			id,
		]);
		if (result.affectedRows === 0) return false;
		return true;
	}


}

export default Bitacora;
