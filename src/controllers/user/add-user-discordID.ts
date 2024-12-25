import { NextFunction, Request, Response } from "express";
import { User } from "../../model/user";
import { successResponce } from "../../utils/responses";

export const addUserDiscordId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, discordId } = req.body;
  try {
    await User.updateOne({ _id: userId }, { discordId: discordId });
    successResponce(res, { discordId }, "Discord ID added successfully");
  } catch (error) {
    next(error);
  }
};
