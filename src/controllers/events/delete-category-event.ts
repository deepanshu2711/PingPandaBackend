import { NextFunction, Request, Response } from "express";
import { Event } from "../../model/event";
import { errorResponce, successResponce } from "../../utils/responses";

export const deleteCategoryEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { eventId } = req.params;
  try {
    const result = await Event.deleteOne({
      _id: eventId,
    });
    if (result.deletedCount === 0) {
      return errorResponce(res, 404, "Event not found");
    }
    successResponce(res, null, "Event deleted successfully");
  } catch (error) {
    next(error);
  }
};
