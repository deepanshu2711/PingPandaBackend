import express from "express";
import { getCategoryEvents } from "../controllers/events/get-category-events";
import { verifyToken } from "../middlewares/verify-token";
import { createCategoryEvent } from "../controllers/events/create-category-event";
import { validate } from "../middlewares/validate-middleware";
import { CreateEventSchema } from "../validators/event";

export const eventRouter = express.Router();

eventRouter.get(
  "/get-category-events/:categoryId",
  verifyToken,
  getCategoryEvents
);

eventRouter.post(
  "/create-category-event",
  validate(CreateEventSchema),
  createCategoryEvent
);
