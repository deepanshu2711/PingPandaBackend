import Bull from "bull";
import { IEventCategory } from "../controllers/events/create-category-event";

export const sendDmQueue = new Bull("sendDmQueue", {
  redis: {
    host: "redis",
    port: 6379,
  },
});

export const sendDmJob = async (
  eventCategory: IEventCategory,
  fields: JSON,
  eventId: string,
  discordId: string | null
) => {
  await sendDmQueue.add(
    "sendDm",
    { eventCategory, fields, eventId, discordId },
    {
      attempts: 2,
      backoff: {
        type: "exponential",
        delay: 1000,
      },
    }
  );
};
