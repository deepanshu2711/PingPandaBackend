import { Request, Response } from "express";
import { Event } from "../../model/event";
import { User } from "../../model/user";
import { EventCategory } from "../../model/event-category";

export const createCategoryEvent = async (req: Request, res: Response) => {
  const { category, fields } = req.body;
  const apiKey = req.query.api_key;

  if (!apiKey) {
    res.status(401).json({ error: "API key is required" });
    return;
  }

  try {
    const user = await User.findOne({ apiKey: apiKey });
    if (!user) {
      res.status(401).json({ error: "Invalid API key" });
      return;
    }

    const existingCategory = await EventCategory.findOne({
      name: category,
      user: user._id,
    });

    if (!existingCategory) {
      res
        .status(400)
        .json({ error: "Event category with this name does not exist" });
      return;
    }

    await Event.create({
      eventCategory: existingCategory._id,
      fields,
      user: user._id,
    });

    //Need to send the discord message after this

    res.status(200).json({ message: "Event created successfully" });
  } catch (error) {
    console.log("CREATE CATEGORY EVENT ERROR", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
