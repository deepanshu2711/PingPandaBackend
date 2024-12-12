import express from "express";
import { signIn, signUp } from "../controllers/auth";
import { validate } from "../middlewares/validate-middleware";
import { signInSchema, signUpSchema } from "../validators/auth";

export const authRouter = express.Router();

authRouter.post("/sign-up", validate(signUpSchema), signUp);
authRouter.post("/sign-in", validate(signInSchema), signIn);
