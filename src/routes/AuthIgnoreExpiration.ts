import { Router } from "express";
import { AuthController } from "../controllers/Auth";
import { inputValidateMidleware } from "../middlewares/InputValidate";
import { userRefreshTokenSchema } from "../middlewares/InputValidate/schemas/user/refreshToken";

const authIgnoreExpirationRouter = Router();
const authController = new AuthController();

authIgnoreExpirationRouter.post(
  "/users/login/refresh-token",
  inputValidateMidleware(userRefreshTokenSchema),
  authController.refreshToken
);

export { authIgnoreExpirationRouter };
