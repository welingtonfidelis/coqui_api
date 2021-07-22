import Joi from "joi";

const messageListByConversationSchema = Joi.object({
  id: Joi.string().required(),
  page: Joi.number().min(1),
  limit: Joi.number().min(10).max(100),
});

export { messageListByConversationSchema };
