import express from "express";

import { verifyToken } from "../middlewares/verify-token";
import { getEventCategories } from "../controllers/event-categories/get-event-categories";

export const eventCategoryRouter = express.Router();

eventCategoryRouter.get(
  "/get-event-categories/:userId",
  verifyToken,
  getEventCategories
);
