import { IEventCategory } from "../controllers/events/create-category-event";
import { sendDmJob } from "../jobs/sendDmJob";
import { sendMailJob } from "../jobs/sendMailJob";

export const sendNotification = async (
  existingCategory: IEventCategory,
  fields: JSON,
  eventId: string,
  discordId: string,
  email: string
) => {
  try {
    if (existingCategory.deliveryType === "discord") {
      await sendDmJob(existingCategory, fields, eventId, discordId || null);
    } else if (existingCategory.deliveryType === "email") {
      const formattedFields = Object.entries(fields)
        .map(([key, value]) => `${key}: ${value}`)
        .join("\n");

      await sendMailJob(
        email,
        `${existingCategory.emoji || "🔔"} ${
          existingCategory.name.charAt(0).toUpperCase() +
          existingCategory.name.slice(1)
        }`,
        `A new ${existingCategory.name} event has occurred! Here are the details:\n\n${formattedFields}`,
        true,
        eventId
      );
    }
  } catch (error) {
    console.log(error);
  }
};
