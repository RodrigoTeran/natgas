import Bitacora from "../../models/Bitacora/bitacora.model";

// Find entry by user and week date
export const findByUser = async (req, res) => {
	const { date } = req.params;
	try {
		const rows = await Bitacora.findByUser(req.user.id, new Date(date));
		res.json({
			auth: true,
			msg: "",
			data: rows,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal Server Error" });
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
// 		res.status(500).json({ message: "Internal Server Error" });
// 	}
// };

// Write a new entry to the database
export const newEntry = async (req, res) => {
	const { aDate, title, content } = req.body;

	try {
		const newEntry = new Bitacora(new Date(aDate), title, content);
		await newEntry.newEntry(req.user.id);
		res.json({ msg: "Entry created" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

// Display data from a specific entry
export const fetchEntry = async (req, res) => {
	// Request params
	const { id } = req.params;
	const clientId = req.user.id;

	// Validate request
	if (!id || !clientId) res.status(400).json({ message: "Bad Request" });

	try {
		const entry = await Bitacora.fetchEntry(clientId, id);
		if (!entry) {
			res.status(404).json({ message: "Entry not found" });
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
		res.status(500).json({ message: "Internal Server Error" });
	}
};

exports.updateEntry = async (req, res) => {
	const { id } = req.params;
	const { aDate, title, content } = req.body;
	try {
		const entry = await Bitacora.fetchEntry(req.user.id, id);
		if (entry == null) {
			res.status(404).json({ message: "Entry not found" });
			return;
		}
		entry.aDate = aDate;
		entry.title = title;
		entry.content = content;
		await Bitacora.updateEntry(req.user.id, id, entry);
		res.json({ msg: "Entry updated" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};
