import Joi from "joi";

const userUpdateProfileSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().allow("").allow(null),
  birth: Joi.date().required(),
  address: Joi.string().allow("").allow(null),
});

export { userUpdateProfileSchema };
