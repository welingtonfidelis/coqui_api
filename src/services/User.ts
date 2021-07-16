import fs from "fs";
import { resolve } from "path";
import handlebars from "handlebars";
import bcrypt from "bcryptjs";

import {
  UserCreatedInterface,
  UserDeleteInterface,
  UserFilterInterface,
  UserForChatFilterInterface,
  UserForChatResponseClientInterface,
  UserInterface,
  UserProfileInterface,
  UserResponseClientInterface,
  UserUpdateInterface,
  UserUpdatePasswordInterface,
  UserUpdateProfileInterface,
  UserUpdateStatusInterface,
} from "../entities/User";
import { AppError } from "../errors/AppError";
import { UserRepository } from "../repository/User";
import { AuthService } from "./Auth";
import { MailService } from "./Mail";
import { randomHash, randomProfileImage } from "../util";

const userRepository = new UserRepository();
const authService = new AuthService();
const mailService = new MailService();

const JWTSECRET: string = process.env.SECRET!;

class UserService {
  async save(data: UserInterface): Promise<UserCreatedInterface> {
    const userAlreadyExists = await userRepository.findOneByUserOrEmail(
      data.user,
      data.email
    );

    if (userAlreadyExists) {
      let message = "User already in use";

      if (userAlreadyExists.email === data.email)
        message = "Email already in use";

      throw new AppError(message, 400);
    }

    const password = randomHash(8);
    data.password = password;
    data.profile_image = randomProfileImage();

    const savedUser = await userRepository.save(data);
    const savedUserHandled: UserCreatedInterface = {
      id: savedUser.id,
      user: data.user,
      name: savedUser.name,
      email: data.email,
      password: password,
      profile_image: data.profile_image
    };

    return savedUserHandled;
  }

  async resetPassword(email: string): Promise<void> {
    const user = await userRepository.findOneByUserOrEmail(email);

    if (!user) {
      throw new AppError("User not found", 400);
    }

    const token = authService.createToken(
      { userId: user.id, ongId: user.company_id },
      15,
      JWTSECRET
    );

    const htmlTemplatePath = resolve(
      __dirname,
      "..",
      "views",
      "html",
      "resetPassword.hbs"
    );
    const htmlTemplate = fs.readFileSync(htmlTemplatePath).toString("utf8");
    const html = handlebars.compile(htmlTemplate)({
      userName: user.name,
      resetLink: `${process.env.URL_FRONT_RESET_PASSWORD}/${token}`,
    });

    await mailService.sendOneMail({
      from: "no-replay@moco.com.br",
      to: user.email,
      subject: "Recuperação de senha",
      message: html,
    });

    return;
  }

  async list(
    filter: UserFilterInterface
  ): Promise<UserResponseClientInterface> {
    const skip = filter.limit * (filter.page - 1);
    filter.page = skip;

    const listUsers = await userRepository.list(filter);

    const listUserHandled: UserResponseClientInterface = {
      count: listUsers.count,
      rows: listUsers.rows.map((item) => item.toListInterface()),
    };

    return listUserHandled;
  }

  async listForChat(filter: UserForChatFilterInterface): Promise<UserForChatResponseClientInterface> {
    const listUsers = await userRepository.listForChat(filter);

    const listUserHandled: UserForChatResponseClientInterface = {
      count: listUsers.count,
      rows: listUsers.rows.map((item) => item.toListForChatInterface()),
    };

    return listUserHandled;
  }

  async show(id: string, companyId: string): Promise<UserProfileInterface | null> {
    const selectedUser = await userRepository.show(id, companyId);

    return selectedUser ? selectedUser.toProfileInterface() : null;
  }

  async update(data: UserUpdateInterface): Promise<boolean> {
    const [updatedUser] = await userRepository.update(data);

    return updatedUser > 0;
  }

  async updateStatus(data: UserUpdateStatusInterface): Promise<boolean> {
    const [updatedUser] = await userRepository.updateStatus(data);

    return updatedUser > 0;
  }

  async updateProfile(data: UserUpdateProfileInterface): Promise<boolean> {
    const [updatedUser] = await userRepository.updateProfile(data);

    return updatedUser > 0;
  }

  async updateResetedPassword(
    data: UserUpdatePasswordInterface
  ): Promise<boolean> {
    const [updatedUser] = await userRepository.updatePassword(data);

    return updatedUser > 0;
  }

  async updatePassword(data: UserUpdatePasswordInterface): Promise<boolean> {
    const selectedUser = await userRepository.show(data.id, data.company_id);

    if (!selectedUser) return false;

    const isValid = bcrypt.compareSync(
      data.old_password!,
      selectedUser.password
    );

    if (!isValid) {
      throw new AppError("Invalid old password", 401);
    }

    const [updatedUser] = await userRepository.updatePassword(data);

    return updatedUser > 0;
  }

  async delete(data: UserDeleteInterface): Promise<boolean> {
    const deletedUser = await userRepository.delete(data);

    return deletedUser > 0;
  }
}

export { UserService };
