import mongoose from "mongoose";
import { EventCategory } from "./model/event-category";

export const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/ping-b");
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};
