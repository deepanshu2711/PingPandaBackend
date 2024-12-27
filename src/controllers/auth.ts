import { NextFunction, Request, Response } from "express";
import { User } from "../model/user";
import bcryptjs from "bcryptjs";
import { generateJwt } from "../helpers/generate-jwt";
import { errorResponce, successResponce } from "../utils/responses";
import { sendMailJob } from "../jobs/sendMailJob";

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

    const apiKey = "pingpanda_" + Math.random().toString(36).substring(2, 15);
    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      apiKey,
    });

    const token = generateJwt(user._id as unknown as string, user.apiKey);
    await sendMailJob(
      user.email,
      "Welcome to PingPanda 🐼",
      `Hello ${user.name},\n\nThank you for signing up! We're excited to have you on board.\n\nBest regards,\nThe Team`
    );

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
      "User created successfully"
    );
  } catch (error) {
    next(error);
  }
};
