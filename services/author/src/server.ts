import { v2 as cloudinary } from "cloudinary";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import authorRoutes from "./routes/author.routes.js";
import { initDB } from "./utils/initDB.js";
import { connectRabbitMQ } from "./utils/rabbitmq.js";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const app = express();
app.use(express.json());
app.use(cors())

connectRabbitMQ()

const port = process.env.PORT;

app.use("/api/v1", authorRoutes);

initDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
