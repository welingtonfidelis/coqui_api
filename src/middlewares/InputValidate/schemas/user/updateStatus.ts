import Joi from "joi";

const userUpdateStatusSchema = Joi.object({
  id: Joi.string().uuid().required(),
  status: Joi.boolean().required(),
});

export { userUpdateStatusSchema };
