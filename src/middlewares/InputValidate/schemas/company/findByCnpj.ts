import Joi from "joi";

const companyFindByCnpjSchema = Joi.object({
  cnpj: Joi.string().required(),
  id: Joi.string().uuid().allow(null)
});

export { companyFindByCnpjSchema };
