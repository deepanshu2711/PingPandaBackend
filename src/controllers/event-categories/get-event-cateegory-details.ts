import { NextFunction, Request, Response } from "express";
import { EventCategory } from "../../model/event-category";
import mongoose from "mongoose";
import { errorResponce, successResponce } from "../../utils/responses";

export const getEventCategoryDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { categoryName, userId } = req.params;
  try {
    const eventCategory = await EventCategory.aggregate([
      {
        $match: {
          name: categoryName,
          user: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $project: {
          name: 1,
          color: 1,
          emoji: 1,
          user: 1,
        },
      },
    ]);
    if (!eventCategory) {
      return errorResponce(res, 404, "Event category not found");
    }
    successResponce(res, eventCategory, "Event category details");
  } catch (error) {
    next(error);
  }
};
