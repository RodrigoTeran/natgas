import Bitacora from "../../models/Bitacora/bitacora.model";

export const findByUserLogic = async (date, userId) => {
	try {
		const rows = await Bitacora.findByUser(userId, new Date(date));
		return rows;
	} catch (error) {
		console.log(error);
		return null;
	}
};

// Find entry by user and week date
export const findByUser = async (req, res) => {
	const { date } = req.params;
	try {
		const rows = await findByUserLogic(date, req.user.id);
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

// //Find entry by params
// export const findByParam = async (req, res) => {
// 	const { clientId, param } = req.params;
// 	try {
// 		// const { aDate, title, content } = req.query;
// 		// const rows = await Bitacora.findAll(req.user.id, {
// 		// 	aDate,
// 		// 	title,
// 		// 	content,
// 		// });
// 		// res.json({
// 		// 	auth: true,
// 		// 	msg: "",
// 		// 	data: rows,
// 		// });
// 		res.json({ msg: "Pending..." });
// 	} catch (error) {
// 		console.log(error);
// 		res.status(500).json({ message: "Error del servidor" });
// 	}
// };

// Write a new entry to the database
export const newEntry = async (req, res) => {
	const { aDate, title, content } = req.body;

	try {
		const newEntry = new Bitacora(new Date(aDate), title, content);
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

exports.updateEntry = async (req, res) => {
	const { id } = req.params;
	const { aDate, title, content } = req.body;
	try {
		const entry = await Bitacora.fetchEntry(req.user.id, id);
		if (entry == null) {
			res
				.status(404)
				.json({ msg: "Entrada no encontrada", auth: true, data: {} });
			return;
		}
		entry.aDate = aDate;
		entry.title = title;
		entry.content = content;
		await Bitacora.updateEntry(req.user.id, id, entry);
		res.json({ msg: "", auth: true, data: {} });
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: "Error del servidor", auth: true, data: {} });
	}
};
