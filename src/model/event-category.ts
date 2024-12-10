import mongoose from "mongoose";

const eventCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    events: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
      },
    ],
    color: {
      type: String,
      required: true,
    },
    emoji: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const EventCategory = mongoose.model(
  "EventCategory",
  eventCategorySchema
);
