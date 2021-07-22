import {
  ConversationFilterInterface,
  ConversationInterface,
  ConversationResponseClientInterface,
  ConversationSaveInterface,
  ConversationWithMessageResponseClientInterface,
} from "../entities/Conversation";
import { ConversationRepository } from "../repository/Conversation";
import { MessageRepository } from "../repository/Message";

const conversationRepository = new ConversationRepository();
const messageRepository = new MessageRepository();

class ConversationService {
  async save(data: ConversationSaveInterface): Promise<ConversationInterface> {
    const savedData = await conversationRepository.save(data);

    return savedData;
  }

  async listByUser(
    filter: ConversationFilterInterface
  ): Promise<ConversationResponseClientInterface> {
    const { limit, page } = filter;

    if (limit && page) {
      const skip = limit * (page - 1);
      filter.page = skip;
    }

    const listData = await conversationRepository.listByUser(filter);

    const treatedData: ConversationResponseClientInterface = {
      count: listData.count,
      rows: [],
    };

    treatedData.rows = listData.rows.map((item) => ({
      id: item.id,
      user_id_a: item.user_id_a,
      user_id_b: item.user_id_b,
      created_at: item.created_at,
    }));

    return treatedData;
  }

  async listWithMessagesByUser(
    filter: ConversationFilterInterface
  ): Promise<ConversationWithMessageResponseClientInterface> {
    const { limit, page, message_page, message_limit, company_id } = filter;

    if (limit && page) {
      const skip = limit * (page - 1);
      filter.page = skip;
    }

    const listData = await conversationRepository.listByUser(filter);

    const treatedData: ConversationWithMessageResponseClientInterface = {
      count: listData.count,
      rows: [],
    };

    for (let i = 0; i < listData.rows.length; i += 1) {
      const item = listData.rows[i]
      const { rows, count } = await messageRepository.listByConversation({
        company_id,
        conversation_id: item.id,
        limit: message_limit,
        page: (message_limit * (message_page - 1)),
      });

      treatedData.rows.push({
        id: item.id,
        user_id_a: item.user_id_a,
        user_id_b: item.user_id_b,
        created_at: item.created_at,
        messages: {
          count,
          rows: rows.map(message => ({
          id: message.id,
          conversation_id: message.conversation_id,
          from_user_id: message.from_user_id,
          to_user_id: message.to_user_id,
          text: message.text,
          sent_time: message.sent_time,
          created_at: message.created_at,
        }))
      },
      });
    }

    return treatedData;
  }

  async findByUserIdAUserIdBOrSave(
    data: ConversationSaveInterface
  ): Promise<ConversationInterface> {
    const selectedData = await conversationRepository.findByUserIdAUserIdB({
      company_id: data.company_id,
      user_id_a: data.user_id_a,
      user_id_b: data.user_id_b,
    });

    if (!selectedData) {
      const savedData = await this.save(data);

      return savedData;
    }

    return selectedData;
  }
}

export { ConversationService };
