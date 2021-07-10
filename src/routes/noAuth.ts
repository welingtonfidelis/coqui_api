import { Router } from "express";
import { AuthController } from "../controllers/Auth";
import { MailController } from "../controllers/Mail";
import { inputValidateMidleware } from "../middlewares/InputValidate";
import { contactMailSchema } from "../middlewares/InputValidate/schemas/mail/contact";
import { userLoginSchema } from "../middlewares/InputValidate/schemas/user/login";
import { userResetPasswordSchema } from "../middlewares/InputValidate/schemas/user/resetUserPassword";

const noAuthRouter = Router();
const authController = new AuthController();
const mailController = new MailController();

noAuthRouter.post(
  "/users/login",
  inputValidateMidleware(userLoginSchema),
  authController.login
);

noAuthRouter.post(
  "/users/profile/reset-password",
  inputValidateMidleware(userResetPasswordSchema),
  mailController.resetUserPassword
);

noAuthRouter.post(
  "/contact/first-contact",
  inputValidateMidleware(contactMailSchema),
  mailController.fisrtContact
);

export { noAuthRouter };
