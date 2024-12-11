import express from "express";
import { Logout, signIn, signUp } from "../controllers/auth";
import { validate } from "../middlewares/validate-middleware";
import { signInSchema, signUpSchema } from "../validators/auth";

export const authRouter = express.Router();

authRouter.post("/sign-up", validate(signUpSchema), signUp);
authRouter.post("/sign-in", validate(signInSchema), signIn);
authRouter.get("/logout", Logout);
