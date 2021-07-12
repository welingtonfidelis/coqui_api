import { Request, Response } from "express";
import { CatchError } from "../decorators";
import { SendMailInterface } from "../entities/Mail";
import { MailService } from "../services/Mail";
import { ResponseClientService } from "../services/ResponseClient";
import { UserService } from "../services/User";
import { removeHtmlFromText } from "../util";

const responseClientService = new ResponseClientService();
const userService = new UserService();
const mailService = new MailService();

const CONTACT_MAIL = process.env.CONTACT_MAIL!;

class MailController {
  @CatchError()
  async resetUserPassword(req: Request, res: Response) {
    const { email } = req.body;

    const savedUser = await userService.resetPassword(email);
    const responseHandled = responseClientService.successResponse(savedUser);

    return res.json(responseHandled);
  }

  @CatchError()
  async fisrtContact(req: Request, res: Response) {
    const { name, email, message } = req.body;

    const data: SendMailInterface = {
      to: CONTACT_MAIL,
      from: email,
      subject: `MOCO - Primeiro Contato de ${name}`,
      message: removeHtmlFromText(message),
    };

    await mailService.sendOneMail(data);
    const responseHandled = responseClientService.successResponse({});

    return res.json(responseHandled);
  }
}

export { MailController };
