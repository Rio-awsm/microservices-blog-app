import express from "express"
import { createBlog, deleteBlog, updateBlog } from "../controllers/author.contoller.js"
import { isAuth } from "../middlewares/isAuth.js"
import uploadFile from "../middlewares/multer.js"

const router = express()

router.post("/blog/new", isAuth, uploadFile, createBlog)
router.post("/blog/:id", isAuth, uploadFile, updateBlog)
router.delete("/blog/:id", isAuth, deleteBlog);

export default router