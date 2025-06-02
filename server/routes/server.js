import e from "express";
import { userRouter } from "./userRoutes.js";
import { adminRouter } from "./adminRoutes.js";
import { productRouter } from "./productRoutes.js";
import { productDetailRouter } from "./productDetailRoutes.js";
import { categoryRouter } from "./categoryRoutes.js";
import { wishlistRouter } from "./wishlistRoutes.js";

const router = e.Router()


router.use("/user",userRouter)
router.use("/admin",adminRouter)
router.use("/product",productRouter)
router.use("/product-detail",productDetailRouter)
router.use("/category", categoryRouter);
router.use("/wishlist", wishlistRouter);


export {router as apiRouter}