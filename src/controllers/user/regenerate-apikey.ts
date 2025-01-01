import { NextFunction, Request, Response } from "express";
import { successResponce } from "../../utils/responses";
import { generateApiKey } from "../../helpers/generate-api-key";
import { User } from "../../model/user";

export const regenerateApiKey = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  try {
    const apiKey = generateApiKey(userId);
    await User.updateOne({ _id: userId }, { apiKey: apiKey });
    successResponce(res, { apiKey }, "API key regenerated successfully");
  } catch (error) {
    next(error);
  }
};
