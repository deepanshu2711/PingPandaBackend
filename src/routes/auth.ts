import express from "express";
import {
  requestResetPassword,
  resetPassword,
  signIn,
  signUp,
} from "../controllers/auth";
import { validate } from "../middlewares/validate-middleware";
import {
  requestResetPasswordSchema,
  resetPasswordSchema,
  signInSchema,
  signUpSchema,
} from "../validators/auth";

export const authRouter = express.Router();

authRouter.post("/sign-up", validate(signUpSchema), signUp);
authRouter.post("/sign-in", validate(signInSchema), signIn);
authRouter.post(
  "/request-password-reset",
  validate(requestResetPasswordSchema),
  requestResetPassword
);
authRouter.post(
  "/reset-password",
  validate(resetPasswordSchema),
  resetPassword
);
