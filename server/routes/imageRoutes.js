import e from "express";
import { getImageById, uploadImage } from "../controllers/imageController.js";
import upload from "../middlewares/multer.js";

const router = e.Router();

router.post("/upload", upload.single('image'), uploadImage);
router.get("/get-image/:id", getImageById);


export { router as imageRouter };