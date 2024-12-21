import { Request, Response } from "express";
import { Event } from "../../model/event";

export const getCategoryEvents = async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  try {
    const events = await Event.find({ category: categoryId });
    res.status(200).json({ events: events });
  } catch (error) {
    console.log("GET CATEGORY EVENTS ERROR", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
