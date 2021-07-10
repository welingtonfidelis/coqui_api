import Joi from "joi";

const userLoginSchema = Joi.object({
  user: Joi.string().required(),
  password: Joi.string().required(),
});

export { userLoginSchema };
