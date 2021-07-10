import Joi from "joi";

const companyShowSchema = Joi.object({
  id: Joi.string().uuid().required(),
});

export { companyShowSchema };
