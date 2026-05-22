import crypto from "crypto";
import nodemailer from "nodemailer";
import { config } from "./config";
//Node mailer transporter
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.EMAIL_NAME,
    pass: config.EMAIL_PASS,
  },
});

// generate 6 digit OTP
export const generateOTP = (length = 6): string => {
  const min = 10 ** (length - 1);
  const max = 10 ** length - 1;

  return crypto.randomInt(min, max).toString();
};
