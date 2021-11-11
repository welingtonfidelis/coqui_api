import { Request, Response } from "express";
import { CatchError } from "../decorators";
import { AuthService } from "../services/Auth";
import { ResponseClientService } from "../services/ResponseClient";

const responseClientService = new ResponseClientService();
const authService = new AuthService();

class AuthController {
  @CatchError()
  async login(req: Request, res: Response) {
    const { user, password } = req.body;
    const selectedUser = await authService.login(user, password);

    const responseHandled = responseClientService.successResponse(selectedUser);

    return res.json(responseHandled);
  }

  @CatchError()
  async refreshToken(req: Request, res: Response) {
    const { userId, companyId } = req;
    const { password } = req.body;

    const selectedUser = await authService.refreshToken(userId, companyId, password);

    const responseHandled = responseClientService.successResponse(selectedUser);

    return res.json(responseHandled);
  }
}

export { AuthController };
