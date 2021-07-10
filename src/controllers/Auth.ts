import { Request, Response } from "express";
import { AuthService } from "../services/Auth";
import { ResponseClientService } from "../services/ResponseClient";

const responseClientService = new ResponseClientService();
const authService = new AuthService();

class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { user, password } = req.body;
      const selectedUser = await authService.login(user, password);

      const responseHandled =
        responseClientService.successResponse(selectedUser);

      return res.json(responseHandled);
    } catch (error) {
      const errorHandled = responseClientService.errorResponse(error);
      return res.status(errorHandled.status_code).json(errorHandled);
    }
  }
}

export { AuthController };
