import { Request, Response } from "express";
import { EventCategory } from "../../model/event-category";
import mongoose from "mongoose";

export const getEventCategoryDetails = async (req: Request, res: Response) => {
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
      res.status(404).json({ error: "Event category not found" });
      return;
    }
    res.status(200).json({ eventCategory: eventCategory });
  } catch (error) {
    console.log("GET EVENT CATEGORY DETAILS ERROR", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
