import express from "express"
import { createBlog } from "../controllers/author.contoller.js"
import { isAuth } from "../middlewares/isAuth.js"
import uploadFile from "../middlewares/multer.js"

const router = express()

router.post("/blog/new", isAuth, uploadFile, createBlog)

export default router