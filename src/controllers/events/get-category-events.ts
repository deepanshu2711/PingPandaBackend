import { NextFunction, Request, Response } from "express";
import { Event } from "../../model/event";
import { startOfToday, startOfWeek, startOfMonth } from "date-fns";
import { successResponce } from "../../utils/responses";

export const getCategoryEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { categoryId } = req.params;
  const { period } = req.query;

  let filterDate: Date | undefined;

  switch (period) {
    case "Today":
      filterDate = startOfToday();
      break;
    case "Week":
      filterDate = startOfWeek(new Date());
      break;
    case "Month":
      filterDate = startOfMonth(new Date());
      break;
    default:
      filterDate = startOfToday();
      return;
  }

  try {
    const events = await Event.find({
      eventCategory: categoryId,
      createdAt: { $gte: filterDate },
    });
    successResponce(res, events, "Events fetched successfully");
  } catch (error) {
    next(error);
  }
};
