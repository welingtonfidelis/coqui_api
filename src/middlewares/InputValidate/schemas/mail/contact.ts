import Joi from "joi";

const contactMailSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  message: Joi.string().required(),
});

export { contactMailSchema };
