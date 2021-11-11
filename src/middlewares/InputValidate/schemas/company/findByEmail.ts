import Joi from "joi";

const companyFindByEmailSchema = Joi.object({
  email: Joi.string().email().required(),
  id: Joi.string().uuid().allow(null)
});

export { companyFindByEmailSchema };
