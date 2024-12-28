import { sendMailQueue } from "../jobs/sendMailJob";
import { Event } from "../model/event";
import { sendMail } from "../utils/mailer";

sendMailQueue.process("sendMail", async (job) => {
  const { to, subject, text } = job.data;
  try {
    await sendMail(to, subject, text);
  } catch (error) {
    console.log("Error sending mail:", error);
  }
});

sendMailQueue.on("completed", async (job) => {
  const { forEvent, eventId } = job.data;
  if (forEvent === true) {
    try {
      await Event.updateOne({ _id: eventId }, { delivered: true });
    } catch (error) {
      console.log("Error setting delivered status for event", error);
    }
  }
});

sendMailQueue.on("failed", (job, error) => {
  console.log(`Job ${job.id} failed: ${error.message}`);
});
