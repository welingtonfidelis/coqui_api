import Joi from "joi";

const conversationListByTokenSchema = Joi.object({
  page: Joi.number().min(1),
  limit: Joi.number().min(5),
});

export { conversationListByTokenSchema };
