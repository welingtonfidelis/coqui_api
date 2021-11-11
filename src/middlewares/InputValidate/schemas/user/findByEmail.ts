import Joi from "joi";

const userFindByEmailSchema = Joi.object({
  email: Joi.string().email().required(),
  id: Joi.string().uuid().allow(null)
});

export { userFindByEmailSchema };
