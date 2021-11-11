import { model, Schema } from "mongoose";
import { ConversationInterface } from "../entities/Conversation";

const ConversationSchema = new Schema<ConversationInterface>(
  {
    company_id: { type: String, required: true },
    user_id_a: { type: String, required: true },
    user_id_b: { type: String, required: true },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const ConversationModel = model<ConversationInterface>(
  "Conversations",
  ConversationSchema
);

export { ConversationModel };
