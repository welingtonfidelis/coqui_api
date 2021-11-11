import { NextFunction, Request, Response } from "express";
import { TokenInterface } from "../entities/Token";
import { ROLES_ENUM } from "../enums/role";
import { AuthService } from "../services/Auth";
import { ResponseClientService } from "../services/ResponseClient";

const responseClientService = new ResponseClientService();
const authService = new AuthService();

const authValidateMidleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const jwtSecret = process.env.SECRET!;
  const { authorization } = req.headers;

  if (!authorization) {
    const errorHandled = responseClientService.successResponse(
      {},
      401,
      "Authorization is required"
    );

    return res.status(401).json(errorHandled);
  }

  const token = authorization.replace("Bearer", "").trim();

  let verifiedToken = {};

  try {
    verifiedToken = authService.verifyToken(token, jwtSecret);
  } catch (error) {
    const errorHandled = responseClientService.successResponse(
      {},
      401,
      error.message || "Failed in authentication"
    );

    return res.status(401).json(errorHandled);
  }

  Object.assign(req, verifiedToken as TokenInterface);

  return next();
};

const authValidateIgnoreExpirationMidleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const jwtSecret = process.env.SECRET!;
  const { authorization } = req.headers;

  if (!authorization) {
    const errorHandled = responseClientService.successResponse(
      {},
      401,
      "Authorization is required"
    );

    return res.status(401).json(errorHandled);
  }

  const token = authorization.replace("Bearer", "").trim();

  let verifiedToken = {};

  try {
    verifiedToken = authService.verifyToken(token, jwtSecret, true);
  } catch (error) {
    const errorHandled = responseClientService.successResponse(
      {},
      401,
      error.message || "Failed in authentication"
    );

    return res.status(401).json(errorHandled);
  }

  Object.assign(req, verifiedToken as TokenInterface);

  return next();
};

const roleValidateMidleware = (acceptableRole: ROLES_ENUM) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { userRole } = req;
    let isValid = false;

    switch (acceptableRole) {
      case "admin": {
        isValid = userRole === ROLES_ENUM.ADMIN;

        break;
      }
      case "manager": {
        isValid =
          userRole === ROLES_ENUM.ADMIN || userRole === ROLES_ENUM.MANAGER;

        break;
      }
      case "user": {
        isValid =
          userRole === ROLES_ENUM.ADMIN ||
          userRole === ROLES_ENUM.MANAGER ||
          userRole === ROLES_ENUM.USER;

        break;
      }
      default: {
        break;
      }
    }

    if (isValid) return next();

    const errorHandled = responseClientService.successResponse(
      {},
      401,
      "Invalid Role"
    );

    return res.status(401).json(errorHandled);
  };
};

export { authValidateMidleware, roleValidateMidleware, authValidateIgnoreExpirationMidleware };
