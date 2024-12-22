import { Request, Response } from "express";
import { Event } from "../../model/event";
import { startOfToday, startOfWeek, startOfMonth } from "date-fns";

export const getCategoryEvents = async (req: Request, res: Response) => {
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
    res.status(200).json({ events: events });
  } catch (error) {
    console.log("GET CATEGORY EVENTS ERROR", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
