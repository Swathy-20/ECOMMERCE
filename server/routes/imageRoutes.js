import e from "express";
import { uploadImage } from "../controllers/imageController.js";
import upload from "../middlewares/multer.js";

const router = e.Router();

router.post("/upload", upload.single('image'), uploadImage);

export { router as imageRouter };