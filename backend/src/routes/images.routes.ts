import express from "express";
import {
    uploadImage
} from "../controllers/images/images.controller";
import {
    multerMid
} from "../middlewares/multer.middleware";
import {
    createService
} from "../middlewares/roles.middleware";

const router = express.Router();

// Rol de admin
router.post("/upload", createService("Añadir rutina"), multerMid.single('image'), uploadImage);

export default router;