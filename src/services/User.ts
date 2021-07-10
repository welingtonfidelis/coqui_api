import fs from "fs";
import { resolve } from "path";
import handlebars from "handlebars";
import bcrypt from "bcryptjs";

import {
  UserCreatedInterface,
  UserFilterInterface,
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
import { randomHash } from "../util";

const userRepository = new UserRepository();
const authService = new AuthService();
const mailService = new MailService();

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
    const savedUser = await userRepository.save(data);
    const savedUserHandled: UserCreatedInterface = {
      id: savedUser.id,
      user: data.user,
      email: data.email,
      password: password,
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
      15
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

  async list(filter: UserFilterInterface): Promise<UserResponseClientInterface> {
    const skip = filter.limit * (filter.page - 1);
    filter.page = skip;

    const listUsers = await userRepository.list(filter);

    const listUserHandled: UserResponseClientInterface = {
      count: listUsers.count,
      rows: listUsers.rows.map((item) => item.toListInterface()),
    };

    return listUserHandled;
  }

  async show(
    id: string,
    ongId: string
  ): Promise<UserProfileInterface | null> {
    const selectedUser = await userRepository.show(id, ongId);

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
}

export { UserService };
