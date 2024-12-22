import { NextFunction, Request, Response } from "express";
import { EventCategory } from "../../model/event-category";
import { errorResponce, successResponce } from "../../utils/responses";

export const createEventCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, userId, color, emoji } = req.body;
  try {
    const existingCategory = await EventCategory.findOne({
      name,
      user: userId,
    });
    if (existingCategory) {
      return errorResponce(
        res,
        400,
        "Event category with this name already exists"
      );
    }
    await EventCategory.create({
      name,
      user: userId,
      color,
      emoji,
    });
    successResponce(res, null, "Event category created successfully");
  } catch (error) {
    next(error);
  }
};
