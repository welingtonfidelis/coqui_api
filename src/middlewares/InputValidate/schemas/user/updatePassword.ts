import Joi from "joi";

const userUpdatePasswordSchema = Joi.object({
  old_password: Joi.string().required(),
  new_password: Joi.string().required().min(4),
});

export { userUpdatePasswordSchema };
