import Bull from "bull";
import { IEventCategory } from "../controllers/events/create-category-event";

export const sendDmQueue = new Bull("sendDmQueue", {
  redis: {
    host: "localhost",
    port: 6379,
  },
});

export const sendDmJob = async (
  eventCategory: IEventCategory,
  fields: JSON
) => {
  await sendDmQueue.add("sendDm", { eventCategory, fields });
};
