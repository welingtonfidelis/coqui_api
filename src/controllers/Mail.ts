import { NextFunction, Request, Response } from "express";
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
  async resetUserPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;

      const savedUser = await userService.resetPassword(email);
      const responseHandled = responseClientService.successResponse(savedUser);

      return res.json(responseHandled);
    } catch (error) {
      next(error);
    }
  }

  async fisrtContact(req: Request, res: Response, next: NextFunction) {
    try {
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
    } catch (error) {
      next(error);
    }
  }
}

export { MailController };
