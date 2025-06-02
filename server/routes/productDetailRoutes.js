import e from "express";
import { createProductDetail, deleteProductDetail, getProductDetailByProductId, updateProductDetail, uploadProductDetailImages } from "../controllers/productDetailController.js"
import upload from "../middlewares/multer.js";
import { authAdmin } from "../middlewares/auth.js";


const router = e.Router();

router.post("/create-product-detail", upload.array('images', 5),authAdmin, createProductDetail);
router.get("/getproductById/:productId",getProductDetailByProductId);
router.put("/update-product-detail/:productId", upload.array('images', 5),authAdmin,updateProductDetail);
router.delete("/delete-product-detail/:productId", authAdmin, deleteProductDetail);
router.post("/images/:id", upload.array('images', 5), authAdmin, uploadProductDetailImages)

export { router as productDetailRouter };