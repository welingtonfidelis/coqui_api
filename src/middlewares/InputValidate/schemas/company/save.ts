import Joi from "joi";

const companySaveSchema = Joi.object({
  name: Joi.string().required(),
  logo: Joi.string().allow(null),
  cnpj: Joi.string().required(),
  email: Joi.string().email().required(),
  active: Joi.boolean().required(),
});

export { companySaveSchema };
