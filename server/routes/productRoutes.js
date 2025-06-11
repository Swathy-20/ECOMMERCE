import e from "express";
import { createProduct, deleteProduct, getAllProducts, getProductsByCategory, getCategories, getProductByProductId, updateProduct, uploadProductImage } from "../controllers/productController.js"
import upload  from "../middlewares/multer.js";

const router = e.Router();

router.post("/create-product", createProduct)
router.get("/get-all-products", getAllProducts)
router.get("/get-by-category/:categoryName", getProductsByCategory);
router.get("/categories", getCategories);
router.get("/getproductbyId/:productId", getProductByProductId);
router.put("/update-product/:productId", updateProduct);
router.delete("/delete-product/:productId", deleteProduct);
router.post("/image/:productId", upload.single('image'), uploadProductImage);


export { router as productRouter };
