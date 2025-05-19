import { v2 as cloudinary } from "cloudinary"
import dotenv from "dotenv"
import express from "express"
import userRoutes from "./routes/user.routes.js"
import connectDB from "./utils/db.js"

dotenv.config()

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
})

const app = express()
app.use(express.json())
connectDB()

app.use("/api/v1", userRoutes)

const port = process.env.PORT

app.listen(port, () => {
  console.log(`User service is running on port ${port}`)
})