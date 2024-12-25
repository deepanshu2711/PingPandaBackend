import express from "express";
import { verifyToken } from "../middlewares/verify-token";
import { regenerateApiKey } from "../controllers/user/regenerate-apikey";
import { addUserDiscordId } from "../controllers/user/add-user-discordID";

export const userRouter = express.Router();

userRouter.get("/regenerate-apiKey/:userId", verifyToken, regenerateApiKey);
userRouter.post("/addDiscordId", verifyToken, addUserDiscordId);
