import {
  MessageByConversationFilterInterface,
  MessageInterface,
  MessageSaveInterface,
} from "../entities/Message";
import { MessageModel } from "../models/Message";

class MessageRepository {
  async save(data: MessageSaveInterface) {
    const savedData = await MessageModel.create(data);

    return savedData;
  }

  async listByConversation(
    filter: MessageByConversationFilterInterface
  ) {
    const { company_id, conversation_id, page, limit } = filter;

    const count = await MessageModel.countDocuments({
      company_id,
      conversation_id,
    });

    const rows = await MessageModel.find(
      {
        company_id,
        conversation_id,
      },
      null,
      { skip: page, limit }
    ).sort({ ["sent_time"]: 1 });

    return {
      rows, count
    }
  }
}

export { MessageRepository };
