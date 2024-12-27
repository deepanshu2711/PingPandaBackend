import Bull from "bull";

export const sendMailQueue = new Bull("sendMailQueue", {
  redis: {
    host: "localhost",
    port: 6379,
  },
});

export const sendMailJob = async (
  to: string,
  subject: string,
  text: string
) => {
  await sendMailQueue.add(
    "sendMail",
    { to, subject, text },
    {
      attempts: 2,
      backoff: {
        type: "exponential",
        delay: 1000,
      },
    }
  );
};
