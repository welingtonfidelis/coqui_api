import Joi from "joi";

const userResetPasswordSchema = Joi.object({
  email: Joi.string().required(),
});

export { userResetPasswordSchema };
