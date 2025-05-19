import express from "express";
import { getUserProfile, loginUser, myProfile, upDateProfilePic, updateUser } from "../controllers/user.controller.js";
import { isAuth } from "../middleware/isAuth.js";
import uploadfile from "../middleware/multer.js";

const router = express.Router();

router.post("/login", loginUser);
router.get("/me", isAuth, myProfile)
router.get("/user/:id", getUserProfile)
router.post("/user/update", isAuth, updateUser);
router.post("/user/update/pic", isAuth, uploadfile, upDateProfilePic);

export default router;
