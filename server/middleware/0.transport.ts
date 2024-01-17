import { Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { emailTransport } from "../utils/transport";

declare module "h3" {
  interface H3EventContext {
    transport: Transporter<SMTPTransport.SentMessageInfo>;
  }
}

export default eventHandler((event) => {
  event.context.transport = emailTransport();
});
