import Joi from "joi";

const companyUpdateStatusSchema = Joi.object({
  id: Joi.string().uuid().required(),
  status: Joi.boolean().required(),
});

export { companyUpdateStatusSchema };
