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
    origin: process.env.FRONTEND_URL,
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

//COMPLETED
// 1. Send Mail when user signUp; (DONE)
// 2. give option to select whether the user wants email or discord notification when a new event is created; (DONE)
// 3. If they want email notification, they need to verify their email; (DONE)
// 4. add a new field of email verified in the user model; (DONE (Not Needed Now) )
// 5. add a filed of notification type (Discord or Email) in category model; (DONE)
// 6. request-password-reset api endpoint (DONE)
// 7. reset-password api endpoint (DONE)
// 8. add a cronejob to remove user from temperory-users after 7 days (DONE)
// 9. Add Docker Compose for Development (DONE)
// 10. Implement Rate Limiting on critical endpoints (DONE)

// Add Caching with Redis: (NOT NEEDED IN THIS APPLICATION AS MOSTLY ALL ENDPOINTS ARE PARTICULAR USER BASED)

//TODO:
//PENDING TASKS
// Implement WebSockets for Real-Time Updates:
// Add Unit and Integration Tests:
// Implement CI/CD Pipeline:
// Add Scheduled Tasks:
// Add a Notification System
// Implement OAuth Authentication:
// Implement Microservices Architecture:
// Implement Logging and Monitoring:
// Implement a notification system to send alerts and updates to users via email, SMS, or push notifications.
// Implement a Payment System:
