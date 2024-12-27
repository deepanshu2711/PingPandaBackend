import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD,
  },
  secure: true,
  tls: {
    rejectUnauthorized: false,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log("SMTP Authentication Failed:", error);
  } else {
    console.log("SMTP Connection is Ready:", success);
  }
});

export const sendMail = async (to: string, subject: string, text: string) => {
  const mailOptions = {
    from: process.env.MAIL_EMAIL,
    to,
    subject,
    text,
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("ERROR WHILE SENDING MAIL", error);
  }
};
