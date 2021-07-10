import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserLoginInterface } from "../entities/User";
import { AppError } from "../errors/AppError";
import { TokenInterface } from "../entities/Token";
import { UserRepository } from "../repository/User";

const userRepository = new UserRepository();
const JWTSECRET: string = process.env.SECRET!;

class AuthService {
  async login(user: string, password: string): Promise<UserLoginInterface> {
    const selectedUser = await userRepository.findOneByUserOrEmail(user);

    if (!selectedUser) {
      throw new AppError("Invalid email or password", 401);
    }

    if (!selectedUser.company.active) {
      throw new AppError("Company is deactivated", 401);
    }

    if (!selectedUser.active) {
      throw new AppError("User is deactivated", 401);
    }

    const isValid = bcrypt.compareSync(password, selectedUser.password);

    if (!isValid) {
      throw new AppError("Invalid email or password", 401);
    }

    const contentToken: TokenInterface = {
      userId: selectedUser.id,
      companyId: selectedUser.company_id,
      userRole: selectedUser.role,
    };
    const token = this.createToken(contentToken, 10 * 60);

    const logedUser: UserLoginInterface = {
      token,
    };

    return logedUser;
  }

  createToken(content: any, expiresMinutes: number) {
    return jwt.sign(content, JWTSECRET, { expiresIn: `${expiresMinutes}m` });
  }
}

export { AuthService };
