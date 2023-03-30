<<<<<<< HEAD
// const Bitacora = require("../models/Bitacora/bitacora.mode⁄l");
import Bitacora from "../models/Bitacora/bitacora.model";

// Find entry by user and week date
exports.findByUser = async (req, res) => {
	const { date } = req.params;
	console.log(date);
	try {
		const rows = await Bitacora.findByUser(req.user.id, new Date(date));
=======
const Bitacora = require("../models/Bitacora/bitacora.model");

// Find entry by user and week date
exports.findByUser = async (req, res) => {
	const { clientId, date } = req.params;
	console.log(clientId, date);
	try {
		const rows = await Bitacora.findByUser(clientId, date);
>>>>>>> cc34379 (medidas-backend-v1)
		res.json({
			auth: true,
			msg: "",
			data: rows,
		});
<<<<<<< HEAD
=======
		console.log(res);
>>>>>>> cc34379 (medidas-backend-v1)
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
<<<<<<< HEAD
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
=======
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
>>>>>>> cc34379 (medidas-backend-v1)
		console.log(res);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

// Write a new entry to the database
exports.newEntry = async (req, res) => {
<<<<<<< HEAD
	// const { clientId } = req.params;
	const { aDate, title, content } = req.body;

	try {
		console.log("Bitacora:", Bitacora);

		const newEntry = new Bitacora(new Date(aDate), title, content);
		await newEntry.newEntry(req.user.id);
		res.json({ msg: "Entry created" });
		// console.log(newEntry);
=======
	const { clientId } = req.params;
	const { aDate, title, content } = req.body;
	try {
		const newEntry = new Bitacora(aDate, title, content);
		await newEntry.newEntry(clientId);
		res.json({ msg: "Entry created" });
		console.log(newEntry);
>>>>>>> cc34379 (medidas-backend-v1)
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};
