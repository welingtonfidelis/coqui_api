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
    const token = this.createToken(contentToken, 10 * 60, JWTSECRET);

    const logedUser: UserLoginInterface = {
      token,
      role: selectedUser.role
    };

    return logedUser;
  }

  createToken(content: any, expiresMinutes: number, secret: string): string {
    return jwt.sign(content, secret, { expiresIn: `${expiresMinutes}m` });
  }

  verifyToken(token: string, secret: string): TokenInterface {
    let verifiedToken: TokenInterface;

    verifiedToken = (jwt.verify(token, secret)) as TokenInterface;

    return verifiedToken;
  }
}

export { AuthService };
