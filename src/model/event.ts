import mongoose from "mongoose";

export const eventSchema = new mongoose.Schema(
  {
    formattedString: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
    },
    fields: {
      type: JSON,
      required: true,
    },
    eventCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EventCategory",
      required: true,
    },
  },
  { timestamps: true }
);

export const Event = mongoose.model("Event", eventSchema);
