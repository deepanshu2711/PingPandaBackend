import { NextFunction, Request, Response } from "express";
import { User } from "../model/user";
import bcryptjs from "bcryptjs";
import { generateJwt } from "../helpers/generate-jwt";
import { errorResponce, successResponce } from "../utils/responses";
import { sendMailJob } from "../jobs/sendMailJob";
import jwt from "jsonwebtoken";
import { TemporaryUser } from "../model/temporary-user";
import { generateVerificationCode } from "../helpers/generate-verification-code";

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return errorResponce(res, 404, "User not found");
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return errorResponce(res, 401, "Invalid password");
    }

    const token = generateJwt(user._id as unknown as string, user.apiKey);
    successResponce(
      res,
      {
        token: token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          apiKey: user.apiKey,
        },
      },
      "Login successful"
    );
  } catch (error) {
    next(error);
  }
};

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponce(res, 409, "User already exists");
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationCode = generateVerificationCode().toString();

    const temporaryUser = await TemporaryUser.findOneAndUpdate(
      { email },
      {
        email,
        password: hashedPassword,
        name,
        isEmailVerified: false,
        verificationCode,
      },
      { new: true, upsert: true }
    );

    await sendMailJob(
      email,
      "Verify Email Request",
      `Hello ${temporaryUser.name},\n\nPlease use the following code to verify your email address:\n\nVerification Code: ${verificationCode}\n\nIf you did not request this, please ignore this email.\n\nBest regards,\nThe Team`,
      false
    );

    return successResponce(res, null, "Verification email sent successfully");
  } catch (error) {
    next(error);
  }
};

export const requestResetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return errorResponce(res, 404, "No account with that email exist.");
    const token = generateJwt(user._id as unknown as string, user.apiKey);

    await sendMailJob(
      email,
      "Reset Password Request",
      `Hello ${user.name},\n\nWe received a request to reset your password. Please click the below link to reset your password:\n\nResetPassword: http://localhost:3000/reset-password?token=${token}\n\nIf you did not request a password reset, please ignore this email.\n\nBest regards,\nThe Team`,
      false
    );

    successResponce(res, null, "Password reset email sent successfully");
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token, newPassword } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
      apiKey: string;
    };
    const user = await User.findOne({ _id: decoded.id });
    if (!user) {
      return errorResponce(res, 404, "Invalid token or user does not exist.");
    }

    const hashedPassword = await bcryptjs.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    successResponce(res, null, "Password reset successfully");
  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, verificationCode } = req.body;
  try {
    const user = await TemporaryUser.findOne({ email });
    if (!user) return errorResponce(res, 404, "No user with this email exists");

    if (user.verificationCode !== verificationCode) {
      return errorResponce(res, 400, "Invalid verification code");
    }

    const apiKey = "pingpanda_" + Math.random().toString(36).substring(2, 15);

    const verifiedUser = await User.create({
      email,
      password: user.password,
      name: user.name,
      apiKey,
    });

    await TemporaryUser.deleteOne({ email });

    const token = generateJwt(
      verifiedUser._id as unknown as string,
      verifiedUser.apiKey
    );

    await sendMailJob(
      verifiedUser.email,
      "Welcome to PingPanda 🐼",
      `Hello ${verifiedUser.name},\n\nThank you for signing up! We're excited to have you on board.\n\nBest regards,\nThe Team`,
      false
    );

    successResponce(
      res,
      {
        token: token,
        user: {
          _id: verifiedUser._id,
          name: verifiedUser.name,
          email: verifiedUser.email,
          apiKey: verifiedUser.apiKey,
        },
      },
      "User created successfully"
    );
  } catch (error) {
    next(error);
  }
};
