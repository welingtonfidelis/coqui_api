import Joi from "joi";

const userFindByUserSchema = Joi.object({
  user: Joi.string().required(),
  id: Joi.string().uuid().allow(null)
});

export { userFindByUserSchema };
