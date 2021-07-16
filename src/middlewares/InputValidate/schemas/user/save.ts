import Joi from "joi";

const userSaveSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().allow("").allow(null),
  user: Joi.string().required(),
  birth: Joi.date().required(),
  address: Joi.string().allow("").allow(null),
  active: Joi.boolean().required(),
  role: Joi.string()
});

export { userSaveSchema };
