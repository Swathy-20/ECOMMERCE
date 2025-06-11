import e from "express";
import { deleteUser, getAdminProfile, getAllUsers, loginAdmin, logoutAdmin, registerAdmin, getStats, checkAdmin } from "../controllers/adminController.js";
import { authAdmin } from "../middlewares/auth.js";


const router = e.Router();

router.post("/signup",registerAdmin)
router.post("/login",loginAdmin);
router.get('/logout', logoutAdmin);
router.get('/profile', authAdmin, getAdminProfile);
router.get('/getallusers',authAdmin, getAllUsers);
router.delete('/deleteuser/:id', authAdmin, deleteUser);
router.get('/stats', authAdmin, getStats);
router.get("/check-admin", authAdmin, checkAdmin);

export { router as adminRouter };
