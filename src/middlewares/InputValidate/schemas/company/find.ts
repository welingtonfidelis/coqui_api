import Joi from "joi";

const companyFindSchema = Joi.object({
  id: Joi.string().uuid().required(),
});

export { companyFindSchema };
