import Joi from "joi";

const companyFindByEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});

export { companyFindByEmailSchema };
