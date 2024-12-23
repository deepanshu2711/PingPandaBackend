import { DiscordClient } from "..";
import { sendDmQueue } from "../jobs/sendDmJob";

sendDmQueue.process("sendDm", async (job) => {
  const { eventCategory, fields } = job.data;
  try {
    const userId = "519876813191643136";
    const user = await DiscordClient.users.fetch(userId);

    const eventData = {
      title: `${eventCategory.emoji || "🔔"} ${
        eventCategory.name.charAt(0).toUpperCase() + eventCategory.name.slice(1)
      }`,
      description: `A new ${eventCategory.name} event has occurred!`,
      color: parseInt(eventCategory.color.replace("#", ""), 16),
      timestamp: new Date().toISOString(),
      fields: (Object.entries(fields) || {}).map(([key, value]) => {
        return {
          name: key,
          value: String(value),
          inline: true,
        };
      }),
    };

    await user.send({
      embeds: [eventData],
    });
  } catch (error) {
    console.error("Error sending DM:", error);
  }
});

sendDmQueue.on("completed", (job) => {
  //make delivery status true
  // console.log(`Job ${job.id} completed`);
});

sendDmQueue.on("failed", (job, err) => {
  //by defaut delivery status is false
  console.log(`Job ${job.id} failed: ${err.message}`);
});
