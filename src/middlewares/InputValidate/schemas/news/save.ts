import Joi from "joi";

const newsSaveSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  expires_in: Joi.date().required(),
});

export { newsSaveSchema };
