import Joi from "joi";

const companyFindByCnpjSchema = Joi.object({
  cnpj: Joi.string().required(),
});

export { companyFindByCnpjSchema };
