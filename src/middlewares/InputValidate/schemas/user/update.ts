import Joi from "joi";

const userUpdateSchema = Joi.object({
  id: Joi.string().uuid().required(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().allow("").allow(null),
  user: Joi.string().required(),
  birth: Joi.date().required(),
  address: Joi.string().allow("").allow(null),
  active: Joi.boolean().required(),
  role: Joi.string().valid('admin', 'manager', 'user').required()
});

export { userUpdateSchema };
