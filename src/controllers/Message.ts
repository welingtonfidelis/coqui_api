import { Request, Response } from "express";
import { ResponseClientService } from "../services/ResponseClient";
import { CatchError } from "../decorators";
import { MessageByConversationFilterInterface } from "../entities/Message";
import { MessageService } from "../services/Message";

const responseClientService = new ResponseClientService();
const messageService = new MessageService();

class MessageController {
  @CatchError()
  async listByConversation(req: Request, res: Response) {
    const page = parseInt((req.query?.page as string) ?? "1");
    const limit = parseInt((req.query?.limit as string) ?? "20");
    const conversation_id = req.query.conversation_id as string;
    const { userId, companyId } = req;

    const filter: MessageByConversationFilterInterface = {
      conversation_id,
      company_id: companyId,
      page,
      limit,
    };
    const listData = await messageService.listByConversation(filter);
    const responseHandled = responseClientService.successResponse(listData);

    return res.json(responseHandled);
  }
}

export { MessageController };
