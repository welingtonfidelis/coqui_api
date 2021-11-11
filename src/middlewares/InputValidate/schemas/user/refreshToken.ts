import Joi from "joi";

const userRefreshTokenSchema = Joi.object({
  password: Joi.string().required().min(4),
});

export { userRefreshTokenSchema };
