import { NextFunction, Request, Response } from "express";
import { EventCategory } from "../../model/event-category";
import { successResponce } from "../../utils/responses";

export const quickStartEventCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.body;
    const categories = [
      { name: "Bug", emoji: "🐛", color: "#45B7D1", user: userId },
      { name: "Sale", emoji: "💰", color: "#FFA07A", user: userId },
      { name: "Question", emoji: "🤔", color: "#FF85A2", user: userId },
    ];

    await EventCategory.insertMany(categories);
    successResponce(res, null, "Quick start event categories added");
  } catch (error) {
    next(error);
  }
};
