import { model, Schema, Model } from "mongoose";
import { MessageInterface } from "../entities/Message";

const MessageSchema: Schema = new Schema(
  {
    company_id: { type: String, required: true },
    conversation_id: { type: String, required: true },
    from_user_id: { type: String, required: true },
    to_user_id: { type: String, required: true },
    text: { type: String, required: true },
    sent_time: { type: Date, required: true },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const MessageModel: Model<MessageInterface> = model(
  "Messages",
  MessageSchema
);

export { MessageModel };
