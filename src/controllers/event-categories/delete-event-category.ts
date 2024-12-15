import { Request, Response } from "express";
import { EventCategory } from "../../model/event-category";

export const deleteEventCategory = async (req: Request, res: Response) => {
  const { categoryName } = req.params;
  const { userId } = req.query;
  try {
    const result = await EventCategory.deleteOne({
      name: categoryName,
      user: userId,
    });
    if (result.deletedCount === 0) {
      res.status(404).json({ error: "Event category not found" });
      return;
    }
    res.status(200).json({ message: "Event category deleted successfully" });
  } catch (error) {
    console.log("DELETE EVENT CATEGORY ERROR", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
