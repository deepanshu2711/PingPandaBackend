import { sendMailQueue } from "../jobs/sendMailJob";
import { sendMail } from "../utils/mailer";

sendMailQueue.process("sendMail", async (job) => {
  const { to, subject, text } = job.data;
  try {
    await sendMail(to, subject, text);
  } catch (error) {
    console.log("Error sending mail:", error);
  }
});

// sendMailQueue.on("completed", (job) => {
//   console.log(`Mail sent seccessfully`);
// });

sendMailQueue.on("failed", (job, error) => {
  console.log(`Job ${job.id} failed: ${error.message}`);
});
