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
import "./workers/sendMailWorker";

//jobs
import "./jobs/clearTemporaryUsersCron";

import { startDiscordBot } from "./config/discord";
import { userRouter } from "./routes/user";

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
app.use("/api/user", userRouter);

app.use(errorHandler);
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

//TODO:

//COMPLETED
// 1. Send Mail when user signUp; (DONE)
// 2. give option to select whether the user wants email or discord notification when a new event is created; (DONE)
// 3. If they want email notification, they need to verify their email; (DONE)
// 4. add a new field of email verified in the user model; (DONE (Not Needed Now) )
// 5. add a filed of notification type (Discord or Email) in category model; (DONE)
// 6. request-password-reset api endpoint (DONE)
// 7. reset-password api endpoint (DONE)

//PENDING TASKS
// 8. add logic to schedule events and add cronjob to send notifications for the events;
// 9. add a cronejob to remove user from temperory-users after one day
