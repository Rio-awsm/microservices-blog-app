import dotenv from "dotenv";
import express from "express";
import { createClient } from "redis";
import blogRoutes from "./routes/blogs.routes.js";
import { startCacheConsumer } from "./utils/consumer.js";

dotenv.config();

const app = express();

const port = process.env.PORT;

startCacheConsumer()

export const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient
  .connect()
  .then(() => console.log("Connected to Redis"))
  .catch(console.error);

app.use("/api/v1", blogRoutes);

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
