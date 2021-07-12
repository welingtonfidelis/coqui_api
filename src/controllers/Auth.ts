import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/Auth";
import { ResponseClientService } from "../services/ResponseClient";

const responseClientService = new ResponseClientService();
const authService = new AuthService();

class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
   try {
      const { user, password } = req.body;
      const selectedUser = await authService.login(user, password);

      const responseHandled =
        responseClientService.successResponse(selectedUser);

      return res.json(responseHandled);
    } catch (error) {
     next(error);
   }
  }
}

export { AuthController };
