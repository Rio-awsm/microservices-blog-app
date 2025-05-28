import express from "express"
import { getAllBlogs, getSingleBlog } from "../controllers/blogs.controller.js"

const router = express.Router()
router.get("/blog/all", getAllBlogs)
router.get("/blog/:id", getSingleBlog)

export default router