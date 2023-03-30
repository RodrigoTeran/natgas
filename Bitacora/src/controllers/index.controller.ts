const Bitacora = require("../models/Bitacora/bitacora.model");

// Find entry by user and week date
exports.findByUser = async (req, res) => {
	const { clientId, date } = req.params;
	console.log(clientId, date);
	try {
		const rows = await Bitacora.findByUser(clientId, date);
		res.json({
			auth: true,
			msg: "",
			data: rows,
		});
		console.log(res);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

//Find entry by params
exports.findByParam = async (req, res) => {
	const { clientId, param } = req.params;
	console.log(clientId, param);
	try {
		const { aDate, title, content } = req.query;
		const rows = await Bitacora.findAll(req.user.id, {
			aDate,
			title,
			content,
		});
		res.json({
			auth: true,
			msg: "",
			data: rows,
		});
		console.log(res);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

// Write a new entry to the database
exports.newEntry = async (req, res) => {
	const { clientId } = req.params;
	const { aDate, title, content } = req.body;
	try {
		const newEntry = new Bitacora(aDate, title, content);
		await newEntry.newEntry(clientId);
		res.json({ msg: "Entry created" });
		console.log(newEntry);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};
