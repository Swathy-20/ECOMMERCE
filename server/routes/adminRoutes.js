import e from "express";
import { deleteUser, getAdminProfile, getAllUsers, loginAdmin, logoutAdmin, registerAdmin } from "../controllers/adminController.js";
import { authAdmin } from "../middlewares/auth.js";


const router = e.Router();

router.post("/signup",registerAdmin)
router.post("/login",loginAdmin);
router.post('/logout', logoutAdmin);
router.get('/profile', authAdmin, getAdminProfile);
router.get('/getallusers',authAdmin, getAllUsers);
router.delete('/deleteuser/:id', authAdmin, deleteUser);


export { router as adminRouter };