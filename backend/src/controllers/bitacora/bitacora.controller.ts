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

//Find entry by params
export const findByParam = async (req, res) => {
	const { clientId, param } = req.params;
	try {
		// const { aDate, title, content } = req.query;
		// const rows = await Bitacora.findAll(req.user.id, {
		// 	aDate,
		// 	title,
		// 	content,
		// });
		// res.json({
		// 	auth: true,
		// 	msg: "",
		// 	data: rows,
		// });
		res.json({ msg: "Pending..." });
		console.log(res);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

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
