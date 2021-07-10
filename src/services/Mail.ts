const sgMail = require("@sendgrid/mail");
import { SendMailInterface } from "../entities/Mail";

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

class MailService {
  async sendOneMail(data: SendMailInterface): Promise<void> {
    sgMail.setApiKey(SENDGRID_API_KEY);

    await sgMail.send({
      to: data.to,
      from: data.from,
      subject: data.subject,
      html: data.message,
    });

    return;
  }
}

export { MailService };
