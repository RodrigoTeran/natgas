import { URL } from "url";
import gc from "../../middlewares/images.middleware";
const bucket = gc.bucket("onyx");

export const uploadImageLogic = (file) =>
	new Promise((resolve, reject) => {
		const { originalname, buffer } = file;

		const newName = new Date().getTime().toString() + originalname;

		const blob = bucket.file(newName.replace(/ /g, "_"));
		const blobStream = blob.createWriteStream({
			resumable: false,
		});
		blobStream
			.on("finish", () => {
				const publicUrl = new URL(
					// `https://storage.googleapis.com/${bucket.name}/${blob.name}`
					`https://storage.cloud.google.com/${bucket.name}/${blob.name}`
				);
				resolve(publicUrl);
			})
			.on("error", () => {
				reject(`Error al subir la imagen`);
			})
			.end(buffer);
	});
export const uploadImage = async (req, res) => {
	try {
		const myFile = req.file;
		const imageUrl = await uploadImageLogic(myFile);
		console.log("Image URL:", imageUrl);
		res.status(200).json({
			msg: "",
			data: {
				url: imageUrl,
			},
			auth: true,
		});
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({
				msg: "Error del servidor",
				auth: true,
				data: { url: undefined },
			});
	}
};
export const deleteImageLogic = async (url: string): Promise<string> => {
	try {
		const blobName = url.slice(38);
		if (blobName.trim() === "") return "Url inválida";

		const myFile = bucket.file(blobName);
		await myFile.delete();

		return "";
	} catch (error) {
		console.error(error);
		return "Error al eliminar imágen";
	}
};
export const deleteImage = async (req, res) => {
	try {
		const { url } = req.params;
		const msg = await deleteImageLogic(url);

		return res.status(200).json({
			msg,
			data: {},
			auth: true,
		});
	} catch (error) {
		return res
			.status(500)
			.json({
				msg: "Error del servidor",
				auth: true,
				data: {},
			});
	};
};
