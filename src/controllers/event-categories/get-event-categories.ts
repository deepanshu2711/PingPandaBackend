import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { EventCategory } from "../../model/event-category";

export const getEventCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  try {
    const eventCategories = await EventCategory.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
    ]);

    if (eventCategories.length === 0) {
      res.status(200).json({ eventCategories: [] });
      return;
    }

    res.status(200).json({ eventCategories: eventCategories });
  } catch (error) {
    next(error);
  }
};
