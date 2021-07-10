import Joi from "joi";

const userDeleteSchema = Joi.object({
  id: Joi.string().uuid().required(),
});

export { userDeleteSchema };
