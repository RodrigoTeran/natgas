import { URL } from "url";
import gc from "../../middlewares/images.middleware";
const bucket = gc.bucket('onyx');

export const uploadImageLogic = (file) => new Promise((resolve, reject) => {
    const { originalname, buffer } = file;

    const newName = new Date().getTime().toString() + originalname;

    const blob = bucket.file(newName.replace(/ /g, "_"))
    const blobStream = blob.createWriteStream({
        resumable: false
    })
    blobStream.on('finish', () => {
        const publicUrl = new URL(
            `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        )
        resolve(publicUrl);
    })
        .on('error', () => {
            reject(`Error al subir la imagen`);
        })
        .end(buffer);
});
export const uploadImage = async (req, res) => {
    try {
        const myFile = req.image;
        const imageUrl = await uploadImageLogic(myFile)
        res
            .status(200)
            .json({
                msg: "",
                data: imageUrl,
                auth: true
            })
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error del servidor", auth: true, data: {} });
    }
};
