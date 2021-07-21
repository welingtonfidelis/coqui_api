import Joi from "joi";

const messageListByConversationSchema = Joi.object({
  conversation_id: Joi.string().required(),
  page: Joi.number().min(1),
  limit: Joi.number().min(10).max(100),
});

export { messageListByConversationSchema };
