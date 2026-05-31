import { config } from "../shared/config/config";
import { transporter } from "../shared/config/mailer";

export const sendOTP = async (email: string, OTP: string, name: string) => {
  await transporter.sendMail({
    from: config.EMAIL_NAME,
    to: email,
    subject: "Email Verification OTP",
    html: `
      <div style="font-family: sans-serif">
        <h2>Email Verification</h2>
        <h3>Hello, ${name}</h3>
        <p>Your OTP is:</p>
        <h1>${OTP}</h1>
        <p>This OTP expires in 5 minutes.</p>
      </div>
    `,
  });
};
