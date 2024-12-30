import Bull from "bull";

export const sendMailQueue = new Bull("sendMailQueue", {
  redis: {
    host: "redis",
    port: 6379,
  },
});

export const sendMailJob = async (
  to: string,
  subject: string,
  text: string,
  forEvent: boolean,
  eventId?: string
) => {
  await sendMailQueue.add(
    "sendMail",
    { to, subject, text, forEvent, eventId },
    {
      attempts: 2,
      backoff: {
        type: "exponential",
        delay: 1000,
      },
    }
  );
};
