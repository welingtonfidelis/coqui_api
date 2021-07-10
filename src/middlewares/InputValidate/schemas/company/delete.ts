import Joi from "joi";

const companyDeleteSchema = Joi.object({
  id: Joi.string().uuid().required(),
});

export { companyDeleteSchema };
