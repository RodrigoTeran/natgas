import type { IRegisterBody } from "./client.types";
import User from "../../models/User/user.model";

export const registerClient = async (req, res) => {
	try {
		const { username, height, weight, dateOfBirth, goal, level, sex } =
			req.body;

		// if (
		// 	username.trim() === "" ||
		// 	height < 0 ||
		// 	weight < 0 ||
		// 	typeof dateOfBirth !== "object" ||
		// 	goal.trim() === "" ||
		// 	level.trim() === "" ||
		// 	(sex !== "F" && sex !== "M")
		// ) {
		// 	return res.json({
		// 		data: {},
		// 		msg: "Los valores están mal",
		// 		auth: true,
		// 	});
		// }

		await User.register(
			req.user.id,
			username,
			sex,
			dateOfBirth,
			weight,
			height,
			goal,
			level
		);

		const user = await User.findById(req.user.id);

		return res.json({
			data: {
				user,
			},
			msg: "",
			auth: true,
		});
	} catch (error) {
		return res.json({
			data: {},
			msg: "Error del servidor",
			auth: true,
		});
	}
};

export const updateInfo = async (req, res) => {
	const {
		clientId,
		username,
		src,
		dateOfBirth,
		weight,
		height,
		goal,
		level,
		sex,
	} = req.body;
	const { id } = req.params;

	try {
		const info = await User.updateInfo(
			req.user.id,
			id,
			username,
			dateOfBirth,
			height,
			weight,
			goal,
			level,
			sex
		);

		res.json({
			auth: true,
			msg: "",
			data: info,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			msg: error.message,
			auth: true,
			data: {},
		});
	}
};

export const updateBlock2 = async (req, res) => {
	const { clientId, goal, level } = req.body;
	const { id } = req.params;
	try {
		const informarcion = await User.updateBlock2(id, goal, level);
		res.json({
			auth: true,
			msg: "",
			data: informarcion,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			msg: error.message,
			auth: true,
			data: {},
		});
	}
};

export const fetchInfo = async (req, res) => {
	try {
		const { id } = req.params;
		const info = await User.fetchInfo(id);
		res.json({
			auth: true,
			msg: "",
			data: info,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			msg: error.message,
			auth: true,
			data: {},
		});
	}
};

export const updateBlock1 = async (req, res) => {
	const {
		clientId,
		username,
		firstName,
		lastName,
		weight,
		height,
		dateOfBirth,
	} = req.body;
	const { id } = req.params;
	try {
		const info = await User.updateBlock1(
			req.user.id,
			id,
			firstName,
			lastName,
			username,
			weight,
			height,
			dateOfBirth
		);
		res.json({
			auth: true,
			msg: "",
			data: info,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			msg: error.message,
			auth: true,
			data: {},
		});
	}
};

export const deleteUser = async (req, res) => {
	const { id } = req.user;
	try {
		await User.deleteUser(id);
		res.status(200).json({ message: "Usuario eliminado correctamente." });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error al eliminar usuario." });
	}
};

export const changeUserRole = async (req, res) => {
	const { targetUserId, newRoleId } = req.body;

	try {
		const result = await User.changeUserRole(targetUserId, newRoleId);

		if (result) {
			res
				.status(200)
				.json({ message: "Rol de usuario actualizado correctamente." });
		} else {
			res
				.status(500)
				.json({ message: "Error al actualizar el rol de usuario." });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error al actualizar el rol de usuario." });
	}
};

export const getAllUsers = async (req, res) => {
	try {
		const { page } = req.query;

		const result = await User.findAll(page);

		res.status(200).json({
			msg: "",
			auth: true,
			data: {
				users: result,
			},
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error al actualizar el rol de usuario." });
	}
};

export const getUserSexData = async (req, res) => {
	try {
		const result = await User.getUserSexData();
		res.json({
			data: result[0],
			msg: "",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: "Error del servidor", auth: true, data: {} });
	}
};

export const getUserJournalData = async (req, res) => {
	try {
		const result = await User.getUserJournalData();
		res.json({
			data: result[0],
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: "Error del servidor", auth: true, data: {} });
	}
};

export const getUserGoalData = async (req, res) => {
	try {
		const result = await User.getUserGoalData();
		res.json({
			data: result[0],
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: "Error del servidor", auth: true, data: {} });
	}
};

export const getUserLevelData = async (req, res) => {
	try {
		const result = await User.getUserLevelData();
		res.json({
			data: result[0],
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: "Error del servidor", auth: true, data: {} });
	}
};
