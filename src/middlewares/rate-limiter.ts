import { NextFunction, Request, Response } from "express";
import rateLimit from "express-rate-limit";
import { errorResponce } from "../utils/responses";

export const LoginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5,
  handler: (req: Request, res: Response, next: NextFunction) => {
    return errorResponce(
      res,
      429,
      "Too many login attempts. Please try again later."
    );
  },
});

export const ResetPasswordLimitter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 3,
  handler: (req: Request, res: Response, next: NextFunction) => {
    return errorResponce(
      res,
      429,
      "Too many reset password attempts. Please try again later."
    );
  },
});
