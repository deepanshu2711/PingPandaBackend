import { Request, Response } from "express";
import { EventCategory } from "../../model/event-category";

export const quickStartEventCategory = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const categories = [
      { name: "Bug", emoji: "🐛", color: "#45B7D1", user: userId },
      { name: "Sale", emoji: "💰", color: "#FFA07A", user: userId },
      { name: "Question", emoji: "🤔", color: "#FF85A2", user: userId },
    ];

    await EventCategory.insertMany(categories);
    res.status(200).json({ message: "Quick start event categories added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
