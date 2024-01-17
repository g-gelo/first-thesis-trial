import { Transporter, createTransport } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

let transport: Transporter<SMTPTransport.SentMessageInfo>;

export function emailTransport() {
  if (!transport) {
    transport = createTransport({
      service: "gmail",
      host: "smtp.gmail.net",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER, // Sender gmail address
        pass: process.env.EMAIL_PASSWORD, // Password from Gmail of the User
      },
    });
  }

  return transport;
}
