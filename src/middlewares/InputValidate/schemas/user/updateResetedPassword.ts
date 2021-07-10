import Joi from "joi";

const userUpdateResetedPasswordSchema = Joi.object({
  new_password: Joi.string().required().min(4),
});

export { userUpdateResetedPasswordSchema };
