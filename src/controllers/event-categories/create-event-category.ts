import { Request, Response } from "express";
import { EventCategory } from "../../model/event-category";

export const createEventCategory = async (req: Request, res: Response) => {
  const { name, userId, color, emoji } = req.body;
  try {
    const existingCategory = await EventCategory.findOne({
      name,
      user: userId,
    });
    if (existingCategory) {
      res
        .status(400)
        .json({ error: "Event category with this name already exists" });
      return;
    }
    const eventCategory = await EventCategory.create({
      name,
      user: userId,
      color,
      emoji,
    });
    res.status(200).json({ eventCategory: eventCategory });
  } catch (error) {
    console.log("CREATE EVENT CATEGORY ERROR", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
