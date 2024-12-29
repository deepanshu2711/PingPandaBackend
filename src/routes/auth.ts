import express from "express";
import {
  requestResetPassword,
  resetPassword,
  signIn,
  signUp,
  verifyEmail,
} from "../controllers/auth";
import { validate } from "../middlewares/validate-middleware";
import {
  requestResetPasswordSchema,
  resetPasswordSchema,
  signInSchema,
  signUpSchema,
  VerifyEmailSchema,
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

authRouter.post("/verify-email", validate(VerifyEmailSchema), verifyEmail);
