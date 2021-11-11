import { model, Schema } from "mongoose";
import { MessageInterface } from "../entities/Message";

const MessageSchema = new Schema<MessageInterface>(
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

const MessageModel = model<MessageInterface>("Messages", MessageSchema);

export { MessageModel };
