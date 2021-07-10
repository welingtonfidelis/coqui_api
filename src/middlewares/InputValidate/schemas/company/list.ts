import Joi from "joi";

const companyListSchema = Joi.object({
  page: Joi.number().min(1),
  limit: Joi.number().min(10).max(100),
  name: Joi.string().min(3),
  cnpj: Joi.string().min(3)
});

export { companyListSchema };
