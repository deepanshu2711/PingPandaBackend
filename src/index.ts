import express from "express";
import { connectDb } from "./bd";
import { authRouter } from "./routes/auth";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { eventCategoryRouter } from "./routes/event-category";

dotenv.config();

const app = express();
connectDb();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api/auth", authRouter);
app.use("/api/event-category", eventCategoryRouter);

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
