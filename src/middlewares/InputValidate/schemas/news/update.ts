import Joi from "joi";

const newsUpdateSchema = Joi.object({
  id: Joi.string().uuid().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  expires_in: Joi.date().required(),
});

export { newsUpdateSchema };
