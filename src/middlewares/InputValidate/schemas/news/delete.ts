import Joi from "joi";

const newsDeleteSchema = Joi.object({
  id: Joi.string().uuid().required(),
});

export { newsDeleteSchema };
