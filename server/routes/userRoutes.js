import e from "express";
import { getUserProfile, loginUser, logoutUser, registerUser } from "../controllers/userController.js";
import { protect } from "../middlewares/auth.js";


const router = e.Router();

router.post("/signup",registerUser)
router.post("/login",loginUser)
router.post('/logout', logoutUser);
router.get('/profile', protect, getUserProfile);


export { router as userRouter };