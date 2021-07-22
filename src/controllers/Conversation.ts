import { Request, Response } from "express";
import { ResponseClientService } from "../services/ResponseClient";
import { CatchError } from "../decorators";
import { ConversationService } from "../services/Conversation";
import { ConversationFilterInterface } from "../entities/Conversation";

const responseClientService = new ResponseClientService();
const conversationService = new ConversationService();

class ConversationController {
  @CatchError()
  async listByToken(req: Request, res: Response) {
    const page = parseInt((req.query?.page as string));
    const limit = parseInt((req.query?.limit as string));
    const message_page = parseInt((req.query?.message_page as string) ?? "1");
    const message_limit = parseInt((req.query?.message_limit as string) ?? "10");
    const { userId, companyId } = req;

    const filter: ConversationFilterInterface = {
      company_id: companyId,
      user_id: userId,
      page,
      limit,
      message_page,
      message_limit,
    };
    const listData = await conversationService.listWithMessagesByUser(filter);
    const responseHandled = responseClientService.successResponse(listData);

    return res.json(responseHandled);
  }
}

export { ConversationController };
