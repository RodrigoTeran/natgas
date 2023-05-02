import Bitacora from "../../models/Bitacora/bitacora.model";
import { parse } from "papaparse";
import router from "../../routes/auth.routes";

export const findByUserLogic = async (date, userId, title, content) => {
	try {
		const rows = await Bitacora.findByUser(
			userId,
			new Date(date),
			title,
			content
		);

		return rows;
	} catch (error) {
		console.log(error);
		return null;
	}
};

// Find entry by user and week date
export const findByUser = async (req, res) => {
	const { date } = req.params;
	const { title, content } = req.query;

	try {
		const rows = await findByUserLogic(date, req.user.id, title, content);

		if (rows === null) {
			res.status(500).json({ msg: "Error del servidor", auth: true, data: {} });
			return;
		}
		res.json({
			auth: true,
			msg: "",
			data: rows,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: "Error del servidor", auth: true, data: {} });
	}
};

// Write a new entry to the database
export const newEntry = async (req, res) => {
	const { title, content } = req.body;

	try {
		const newEntry = new Bitacora(title, content);
		await newEntry.newEntry(req.user.id);
		res.json({ msg: "", data: {}, auth: true });
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: "Error del servidor", auth: true, data: {} });
	}
};

// Display data from a specific entry
export const fetchEntry = async (req, res) => {
	// Request params
	const { id } = req.params;
	const clientId = req.user.id;

	// Validate request
	if (!id || !clientId)
		res
			.status(400)
			.json({ msg: "Los datos no son válidos", auth: true, data: {} });

	try {
		const entry = await Bitacora.fetchEntry(clientId, id);
		if (!entry) {
			res
				.status(404)
				.json({ msg: "Entrada no encontrada", auth: true, data: {} });
			return;
		}
		res.json({
			auth: true,
			msg: "",
			// Aqui se manda la informacion de la entrada
			data: entry,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: "Error del servidor", auth: true, data: {} });
	}
};

export const updateEntry = async (req, res) => {
	const { id } = req.params;
	const { title, content, createdAt } = req.body;
	try {
		const entry = await Bitacora.fetchEntry(req.user.id, id);
		if (entry == null) {
			return res.status(404).json({
				msg: "Entrada no encontrada",
				auth: true,
				data: {},
			});
		}

		entry.title = title;
		entry.content = content;
		await Bitacora.updateEntry(req.user.id, id, createdAt, entry);

		res.json({
			auth: true,
			msg: "Entrada actualizada exitosamente",
			data: entry,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: "Error del servidor", auth: true, data: {} });
	}
};

// Delete an entry
export const deleteEntry = async (req, res) => {
	const { id } = req.params;
	try {
		const entry = await Bitacora.fetchEntry(req.user.id, id);
		if (entry == null) {
			return res.status(404).json({
				msg: "Entrada no encontrada",
				auth: true,
				data: {},
			});
		}
		await Bitacora.deleteEntry(req.user.id, id);
		res.json({
			auth: true,
			msg: "",
			data: entry,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: "Error del servidor", auth: true, data: {} });
	}
};

// Download all entries from a specific user

export const downloadEntries = async (req, res) => {
	// Request params
	const clientId  = req.user.id
	try {
		const rows = await Bitacora.fetchAll(clientId);
		if (rows === null) {
			res.status(500).json({ msg: "Error del servidor", auth: true, data: {} });
			return;
		}
		res.json({
			data: rows[0],
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: "Error del servidor", auth: true, data: {} });
	}
};
