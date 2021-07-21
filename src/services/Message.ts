import {
  MessageByConversationFilterInterface,
  MessageInterface,
  MessageListInterface,
  MessageResponseClientInterface,
  MessageSaveInterface,
} from "../entities/Message";
import { MessageRepository } from "../repository/Message";

const messageRepository = new MessageRepository();
class MessageService {
  async save(data: MessageSaveInterface): Promise<MessageInterface> {
    const savedData = await messageRepository.save(data);

    return savedData;
  }

  async listByConversation(
    filter: MessageByConversationFilterInterface
  ): Promise<MessageResponseClientInterface> {
    const skip = filter.limit * (filter.page - 1);
    filter.page = skip;

    const listData = await messageRepository.listByConversation(filter);

    const treatedData: MessageResponseClientInterface = {
      count: listData.count,
      rows: []
    }
    
    treatedData.rows = listData.rows.map(item => ({
      id: item.id,
      conversation_id: item.conversation_id,
      from_user_id: item.from_user_id,
      to_user_id: item.to_user_id,
      text: item.text,
      sent_time: item.sent_time,
      created_at: item.created_at
    }));

    return treatedData;
  }
}

export { MessageService };
