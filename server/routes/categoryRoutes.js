import e from "express";
import upload from "../middlewares/multer.js";
import { createCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from "../controllers/categoryController.js";

const router = e.Router();

router.post("/add-category", upload.single('image'), createCategory);
router.get("/get-categories", getCategories);
router.get("/get-category/:id", getCategoryById);
router.put("/update-category/:id", upload.single('image'), updateCategory);
router.delete("/delete-category/:id", deleteCategory);

export { router as categoryRouter };