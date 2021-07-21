import { Router } from "express";
import { ConversationController } from "../controllers/Conversation";
import { inputValidateMidleware } from "../middlewares/InputValidate";
import { conversationListByTokenSchema } from "../middlewares/InputValidate/schemas/conversation/listByToken";

const conversationRouter = Router();
const conversationController = new ConversationController();

conversationRouter.get(
  "/conversations/by-token",
  inputValidateMidleware(conversationListByTokenSchema),
  conversationController.listByToken
);

export { conversationRouter };
