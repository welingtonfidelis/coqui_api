import Joi from "joi";

const newsShowSchema = Joi.object({
  id: Joi.string().uuid().required(),
});

export { newsShowSchema };
