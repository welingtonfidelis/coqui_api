import Joi from "joi";

const companyUpdateSchema = Joi.object({
  id: Joi.string().uuid().required(),
  name: Joi.string().required(),
  logo: Joi.string().required(),
  cnpj: Joi.string().required(),
  email: Joi.string().email().required(),
  active: Joi.boolean().required(),
});

export { companyUpdateSchema };
