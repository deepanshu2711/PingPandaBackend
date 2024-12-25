import { NextFunction, Request, Response } from "express";
import { User } from "../../model/user";
import { successResponce } from "../../utils/responses";

export const regenerateApiKey = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  try {
    const apiKey = "pingpanda_" + Math.random().toString(36).substring(2, 15);
    await User.updateOne({ _id: userId }, { apiKey: apiKey });
    successResponce(res, { apiKey }, "API key regenerated successfully");
  } catch (error) {
    next(error);
  }
};
