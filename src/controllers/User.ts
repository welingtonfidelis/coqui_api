import { Request, Response } from "express";
import { UserService } from "../services/User";
import { ResponseClientService } from "../services/ResponseClient";
import {
  UserDeleteInterface,
  UserFilterInterface,
  UserForChatFilterInterface,
  UserInterface,
  UserUpdateInterface,
  UserUpdatePasswordInterface,
  UserUpdateProfileInterface,
  UserUpdateStatusInterface,
} from "../entities/User";
import { CatchError } from "../decorators";

const responseClientService = new ResponseClientService();
const userService = new UserService();

class UserController {
  @CatchError()
  async save(req: Request, res: Response) {
    const data: UserInterface = req.body;
    const { companyId } = req;
    data.company_id = companyId;

    const savedUser = await userService.save(data);
    const responseHandled = responseClientService.successResponse(savedUser);

    return res.json(responseHandled);
  }

  @CatchError()
  async list(req: Request, res: Response) {
    const page = parseInt((req.query?.page as string) ?? "1");
    const limit = parseInt((req.query?.limit as string) ?? "15");
    const name = req.query?.name as string;
    const email = req.query?.email as string;
    const { companyId } = req;

    const filter: UserFilterInterface = {
      companyId,
      page,
      limit,
      name,
      email,
    };
    const listUsers = await userService.list(filter);
    const responseHandled = responseClientService.successResponse(listUsers);

    return res.json(responseHandled);
  }

  @CatchError()
  async listForChat(req: Request, res: Response) {
    const { userId, companyId } = req;
    const filter: UserForChatFilterInterface = {
      userId,
      companyId,
    };

    const listUsers = await userService.listForChat(filter);
    const responseHandled = responseClientService.successResponse(listUsers);

    return res.json(responseHandled);
  }

  @CatchError()
  async find(req: Request, res: Response) {
    const { id } = req.params;
    const { companyId } = req;

    const selectedUser = await userService.find(id, companyId);
    const responseHandled = responseClientService.successResponse(selectedUser);

    return res.json(responseHandled);
  }

  @CatchError()
  async findProfile(req: Request, res: Response) {
    const { userId, companyId } = req;

    const updatedUser = await userService.find(userId, companyId);
    const responseHandled = responseClientService.successResponse(updatedUser);

    return res.json(responseHandled);
  }

  @CatchError()
  async findByEmail(req: Request, res: Response) {
    const { email } = req.params;
    const id = req.query.id as string;

    const selectedUser = await userService.findByEmail(email, id);
    const responseHandled =
      responseClientService.successResponse(selectedUser);

    return res.json(responseHandled);
  }

  @CatchError()
  async findByUser(req: Request, res: Response) {
    const { user } = req.params;
    const id = req.query.id as string;

    const selectedUser = await userService.findByUser(user, id);
    const responseHandled =
      responseClientService.successResponse(selectedUser);

    return res.json(responseHandled);
  }

  @CatchError()
  async update(req: Request, res: Response) {
    const { name, address, birth, phone, user, email, active, role } = req.body;
    const { id } = req.params;
    const { companyId } = req;

    const data: UserUpdateInterface = {
      id,
      name,
      address,
      birth,
      phone,
      company_id: companyId,
      user,
      email,
      active,
      role,
    };

    const updateduser = await userService.update(data);
    const responseHandled = responseClientService.successResponse(updateduser);

    return res.json(responseHandled);
  }

  @CatchError()
  async updateStatus(req: Request, res: Response) {
    const { status } = req.body;
    const { id } = req.params;
    const { companyId } = req;
    const data: UserUpdateStatusInterface = {
      id,
      active: status,
      company_id: companyId,
    };

    const updatedUser = await userService.updateStatus(data);
    const responseHandled = responseClientService.successResponse(updatedUser);

    return res.json(responseHandled);
  }

  @CatchError()
  async updateProfile(req: Request, res: Response) {
    const { name, phone, birth, address, active } = req.body;
    const { userId, companyId } = req;
    const data: UserUpdateProfileInterface = {
      id: userId,
      company_id: companyId,
      name,
      phone,
      birth,
      address,
      active,
    };

    const updatedUser = await userService.updateProfile(data);
    const responseHandled = responseClientService.successResponse(updatedUser);

    return res.json(responseHandled);
  }

  @CatchError()
  async updateResetedPassword(req: Request, res: Response) {
    const { new_password } = req.body;
    const { userId, companyId } = req;
    const data: UserUpdatePasswordInterface = {
      id: userId,
      company_id: companyId,
      new_password,
    };

    const updatedUser = await userService.updateResetedPassword(data);
    const responseHandled = responseClientService.successResponse(updatedUser);

    return res.json(responseHandled);
  }

  @CatchError()
  async updatePassword(req: Request, res: Response) {
    const { old_password, new_password } = req.body;
    const { userId, companyId } = req;
    const data: UserUpdatePasswordInterface = {
      id: userId,
      company_id: companyId,
      new_password,
      old_password,
    };

    const updatedUser = await userService.updatePassword(data);
    const responseHandled = responseClientService.successResponse(updatedUser);

    return res.json(responseHandled);
  }

  @CatchError()
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const { companyId } = req;
    const data: UserDeleteInterface = { id, company_id: companyId };

    const deletedUser = await userService.delete(data);
    const responseHandled = responseClientService.successResponse(deletedUser);

    return res.json(responseHandled);
  }
}

export { UserController };
