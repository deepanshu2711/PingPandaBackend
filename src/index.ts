import express from "express";
import { connectDb } from "./bd";
import { authRouter } from "./routes/auth";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { eventCategoryRouter } from "./routes/event-category";
import { eventRouter } from "./routes/events";
import { errorHandler } from "./middlewares/errorHandler";

// workers
import "./workers/sendDMWorker";
import { startDiscordBot } from "./config/discord";

dotenv.config();

const app = express();
connectDb();
export const DiscordClient = startDiscordBot();

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
app.use("/api/event", eventRouter);

app.use(errorHandler);
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
