import { Document } from "mongoose";

export interface MessageInterface extends Document {
  id: string;
  company_id: string;
  conversation_id: string;
  from_user_id: string;
  to_user_id: string;
  text: string;
  sent_time: Date;
  created_at: Date;
  updated_at: Date;
}

export interface MessageSaveInterface {
  company_id: string;
  conversation_id: string;
  from_user_id: string;
  to_user_id: string;
  text: string;
  sent_time: Date;
}

export interface MessageListInterface {
  id: string;
  conversation_id: string;
  from_user_id: string;
  to_user_id: string;
  text: string;
  sent_time: Date;
  created_at: Date;
}

export interface MessageByConversationFilterInterface {
  conversation_id: string;
  company_id: string;
  page: number;
  limit: number;
}

export interface MessageResponseClientInterface {
  rows: MessageListInterface[];
  count: number;
}