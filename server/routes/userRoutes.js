import e from "express";
import { checkUser, getUserProfile, loginUser, logoutUser, registerUser } from "../controllers/userController.js";
import { protect } from "../middlewares/auth.js";


const router = e.Router();

router.post("/signup",registerUser)
router.post("/login",loginUser)
router.post('/logout', logoutUser);
router.get('/profile', protect, getUserProfile);
router.get("/check-user", protect, checkUser);


export { router as userRouter };