import express from "express";
import { getCategoryEvents } from "../controllers/events/get-category-events";
import { verifyToken } from "../middlewares/verify-token";

export const eventRouter = express.Router();

eventRouter.get(
  "/get-category-events/:categoryId",
  verifyToken,
  getCategoryEvents
);
