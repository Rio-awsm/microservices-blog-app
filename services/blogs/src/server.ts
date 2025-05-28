import dotenv from "dotenv"
import express from "express"
import blogRoutes from "./routes/blogs.routes.js"

dotenv.config()

const app = express()

const port = process.env.PORT

app.use("/api/v1", blogRoutes)

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`)
})