import Joi from "joi";

const newsListSchema = Joi.object({
  page: Joi.number().min(1),
  limit: Joi.number().min(10).max(100),
  title: Joi.string().min(3),
});

export { newsListSchema };
