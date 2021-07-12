import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/User";
import { ResponseClientService } from "../services/ResponseClient";
import {
  UserFilterInterface,
  UserInterface,
  UserUpdateInterface,
  UserUpdatePasswordInterface,
  UserUpdateProfileInterface,
  UserUpdateStatusInterface,
} from "../entities/User";

const responseClientService = new ResponseClientService();
const userService = new UserService();

class UserController {
  async save(req: Request, res: Response, next: NextFunction) {
    try {
      const data: UserInterface = req.body;
      const { companyId } = req;
      data.company_id = companyId;

      const savedUser = await userService.save(data);
      const responseHandled = responseClientService.successResponse(savedUser);

      return res.json(responseHandled);
    } catch (error) {
      next(error);
    }
  }

  // @CatchError()
  async list(req: Request, res: Response, next: NextFunction) {
    try {
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
    } catch (error) {
      next(error);
    }
  }

  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { companyId } = req;

      const selectedUser = await userService.show(id, companyId);
      const responseHandled =
        responseClientService.successResponse(selectedUser);

      return res.json(responseHandled);
    } catch (error) {
      next(error);
    }
  }

  async showProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, companyId } = req;

      const updatedUser = await userService.show(userId, companyId);
      const responseHandled =
        responseClientService.successResponse(updatedUser);

      return res.json(responseHandled);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { 
        name, address, birth, phone, 
        user, email, active 
      } = req.body;
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
      };

      const updateduser = await userService.update(data);
      const responseHandled =
        responseClientService.successResponse(updateduser);

      return res.json(responseHandled);
    } catch (error) {
      next(error);
    }
  }

  async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { status } = req.body;
      const { id } = req.params;
      const { companyId } = req;
      const data: UserUpdateStatusInterface = {
        id,
        active: status,
        company_id: companyId,
      };

      const updatedUser = await userService.updateStatus(data);
      const responseHandled =
        responseClientService.successResponse(updatedUser);

      return res.json(responseHandled);
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
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
      const responseHandled =
        responseClientService.successResponse(updatedUser);

      return res.json(responseHandled);
    } catch (error) {
      next(error);
    }
  }

  async updateResetedPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { new_password } = req.body;
      const { userId, companyId } = req;
      const data: UserUpdatePasswordInterface = {
        id: userId,
        company_id: companyId,
        new_password,
      };

      const updatedUser = await userService.updateResetedPassword(data);
      const responseHandled =
        responseClientService.successResponse(updatedUser);

      return res.json(responseHandled);
    } catch (error) {
      next(error);
    }
  }

  async updatePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { old_password, new_password } = req.body;
      const { userId, companyId } = req;
      const data: UserUpdatePasswordInterface = {
        id: userId,
        company_id: companyId,
        new_password,
        old_password,
      };

      const updatedUser = await userService.updatePassword(data);
      const responseHandled =
        responseClientService.successResponse(updatedUser);

      return res.json(responseHandled);
    } catch (error) {
      next(error);
    }
  }
}

function CatchError(): any {
  return (_: object, __: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
    const orignalValue = descriptor.value;
    descriptor.value = async function(...args: any[]): Promise<any> {
      try {
        return await orignalValue.apply(this, args);
      } catch (error) {
        console.log('\n\n\n ERROR ===> ', error);
      }
    }
    return descriptor;
  }
}

export { UserController };
