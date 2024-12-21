import express from "express";

import { verifyToken } from "../middlewares/verify-token";
import { getEventCategories } from "../controllers/event-categories/get-event-categories";
import { deleteEventCategory } from "../controllers/event-categories/delete-event-category";
import { createEventCategory } from "../controllers/event-categories/create-event-category";
import { validate } from "../middlewares/validate-middleware";
import {
  eventCategorySchema,
  quickStartEventCategorySchema,
} from "../validators/event-category";
import { quickStartEventCategory } from "../controllers/event-categories/quick-start-event-category";
import { getEventCategoryDetails } from "../controllers/event-categories/get-event-cateegory-details";

export const eventCategoryRouter = express.Router();

eventCategoryRouter.get(
  "/get-event-categories/:userId",
  verifyToken,
  getEventCategories
);

eventCategoryRouter.delete(
  "/delete-event-category/:categoryName",
  verifyToken,
  deleteEventCategory
);

eventCategoryRouter.post(
  "/create-event-category",
  verifyToken,
  validate(eventCategorySchema),
  createEventCategory
);

eventCategoryRouter.post(
  "/quick-start",
  verifyToken,
  validate(quickStartEventCategorySchema),
  quickStartEventCategory
);

eventCategoryRouter.get(
  "/get-event-category-details/:categoryName/:userId",
  verifyToken,
  getEventCategoryDetails
);
