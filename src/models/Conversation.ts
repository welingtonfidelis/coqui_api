import { model, Schema, Model } from "mongoose";
import { ConversationInterface } from "../entities/Conversation";

const ConversationSchema: Schema = new Schema(
  {
    company_id: { type: String, required: true },
    user_id_a: { type: String, required: true },
    user_id_b: { type: String, required: true },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const ConversationModel: Model<ConversationInterface> = model(
  "Conversations",
  ConversationSchema
);

export { ConversationModel };
