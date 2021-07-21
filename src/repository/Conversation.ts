import {
  ConversationByUserIdAUserIdB,
  ConversationInterface,
  ConversationSaveInterface,
} from "../entities/Conversation";
import { ConversationFilterInterface } from "../entities/Conversation";
import { ConversationModel } from "../models/Conversation";

class ConversationRepository {
  async save(data: ConversationSaveInterface) {
    const savedData = await ConversationModel.create(data);

    return savedData;
  }

  async listByUser(
    filter: ConversationFilterInterface
  ) {
    const { company_id, user_id, page, limit } = filter;

    let pagination = {};
    if ((page || page === 0) && limit) pagination = { skip: page, limit };

    const count = await ConversationModel.countDocuments({
      company_id,
      $or: [{ user_id_a: user_id }, { user_id_b: user_id }],
    });

    const rows = await ConversationModel.find(
      {
        company_id,
        $or: [{ user_id_a: user_id }, { user_id_b: user_id }],
      },
      null,
      pagination
    );

    return {
      rows, count
    }
  }

  async findByUserIdAUserIdB(
    filter: ConversationByUserIdAUserIdB
  ) {
    const { company_id, user_id_a, user_id_b } = filter;

    const findedData = await ConversationModel.findOne({
      company_id,
      $or: [
        { user_id_a, user_id_b },
        { user_id_a: user_id_b, user_id_b: user_id_a },
      ],
    });

    return findedData;
  }
}

export { ConversationRepository };
