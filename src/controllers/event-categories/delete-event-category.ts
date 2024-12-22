import { NextFunction, Request, Response } from "express";
import { EventCategory } from "../../model/event-category";
import { errorResponce, successResponce } from "../../utils/responses";

export const deleteEventCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { categoryName } = req.params;
  const { userId } = req.query;
  try {
    const result = await EventCategory.deleteOne({
      name: categoryName,
      user: userId,
    });
    if (result.deletedCount === 0) {
      return errorResponce(res, 404, "Event category not found");
    }
    successResponce(res, null, "Event category deleted successfully");
  } catch (error) {
    next(error);
  }
};
