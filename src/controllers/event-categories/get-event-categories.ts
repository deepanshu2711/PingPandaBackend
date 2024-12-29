import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { EventCategory } from "../../model/event-category";
import { Event } from "../../model/event";
import { startOfMonth } from "date-fns";

export const getEventCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  const filterDate = startOfMonth(new Date());

  try {
    const eventCategories = await EventCategory.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      {
        $lookup: {
          from: Event.collection.name,
          localField: "_id",
          foreignField: "eventCategory",
          as: "events",
        },
      },
      {
        $addFields: {
          last_ping: { $max: "$events.createdAt" },
          events_this_month: {
            $filter: {
              input: "$events",
              as: "event",
              cond: { $gte: ["$$event.createdAt", filterDate] },
            },
          },
        },
      },
      {
        $addFields: {
          events_this_month_count: { $size: "$events_this_month" },
        },
      },
      {
        $project: {
          name: 1,
          color: 1,
          emoji: 1,
          user: 1,
          deliveryType: 1,
          createdAt: 1,
          last_ping: 1,
          events_this_month_count: 1,
        },
      },
    ]);

    if (eventCategories.length === 0) {
      res.status(200).json({ eventCategories: [] });
      return;
    }

    res.status(200).json({ eventCategories });
  } catch (error) {
    next(error);
  }
};
