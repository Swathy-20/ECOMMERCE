import e from "express";
import { addToWishlist, getWishlist, removeFromWishlist } from "../controllers/wishlistController.js";
import { protect } from "../middlewares/auth.js";


const router = e.Router();

router.post("/add-to-wishlist", addToWishlist);
router.get("/get-wishlist/:userId", protect, getWishlist);
router.delete("/remove-from-wishlist",  removeFromWishlist);

export { router as wishlistRouter };