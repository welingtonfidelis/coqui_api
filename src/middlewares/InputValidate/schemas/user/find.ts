import Joi from "joi";

const userFindSchema = Joi.object({
  id: Joi.string().uuid().required(),
});

export { userFindSchema };
