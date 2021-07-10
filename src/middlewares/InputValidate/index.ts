import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { AppError } from "../../errors/AppError";
import { ResponseClientService } from "../../services/ResponseClient";

const responseClientService = new ResponseClientService();

const inputValidateMidleware = (schema: Joi.Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const input = { ...req.body, ...req.params, ...req.query };
      const options = {
        abortEarly: false,
      };

      const { error } = schema.validate(input, options);

      if (error) {
        throw new AppError(error.message, 400);
      }

      next();
    } catch (error) {
      const errorHandled = responseClientService.errorResponse(error);
      return res.status(errorHandled.status_code).json(errorHandled);
    }
  };
};

export { inputValidateMidleware };
