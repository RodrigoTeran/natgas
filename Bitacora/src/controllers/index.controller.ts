const Bitacora = require("../models/Bitacora/bitacora.model");

// Find entry by user and week date
exports.findByUser = async (req, res) => {
	const { clientId, date } = req.params;
	console.log(clientId, date);
	try {
		const rows = await Bitacora.findByUser(clientId, date);
		res.json({ data: rows });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

// Write a new entry to the database
exports.newEntry = async (req, res) => {
	const { providerId } = req.params;
	const { aDate, title, content } = req.body;
	try {
		const newEntry = new Bitacora(aDate, title, content);
		await newEntry.mewEntry(providerId);
		res.json({ msg: "Entry created" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};
