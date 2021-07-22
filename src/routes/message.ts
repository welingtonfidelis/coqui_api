import { Router } from "express";
import { MessageController } from "../controllers/Message";
import { inputValidateMidleware } from "../middlewares/InputValidate";
import { messageListByConversationSchema } from "../middlewares/InputValidate/schemas/message/listByConversation";

const messageRouter = Router();
const messageController = new MessageController();

messageRouter.get(
  "/messages/by-conversation/:id",
  inputValidateMidleware(messageListByConversationSchema),
  messageController.listByConversation
);

export { messageRouter };
