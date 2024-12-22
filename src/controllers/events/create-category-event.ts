import { NextFunction, Request, Response } from "express";
import { Event } from "../../model/event";
import { User } from "../../model/user";
import { EventCategory } from "../../model/event-category";
import { errorResponce, successResponce } from "../../utils/responses";

export const createCategoryEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { category, fields } = req.body;
  const apiKey = req.query.api_key;

  if (!apiKey) {
    return errorResponce(res, 401, "API key is required");
  }

  try {
    const user = await User.findOne({ apiKey: apiKey });
    if (!user) {
      return errorResponce(res, 401, "Invalid API key");
    }

    const existingCategory = await EventCategory.findOne({
      name: category,
      user: user._id,
    });

    if (!existingCategory) {
      return errorResponce(res, 404, "Event category not found");
    }

    await Event.create({
      eventCategory: existingCategory._id,
      fields,
      user: user._id,
    });

    //Need to send the discord message after this

    successResponce(res, null, "Event created successfully");
  } catch (error) {
    next(error);
  }
};
