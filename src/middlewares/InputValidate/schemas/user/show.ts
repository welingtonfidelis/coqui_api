import Joi from "joi";

const userShowSchema = Joi.object({
  id: Joi.string().uuid().required(),
});

export { userShowSchema };
