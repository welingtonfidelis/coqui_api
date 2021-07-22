import { Document } from "mongoose";
import { MessageListInterface } from "./Message";

export interface ConversationInterface extends Document {
  id: string;
  company_id: string;
  user_id_a: string;
  user_id_b: string;
  created_at: Date;
  updated_at: Date;
}

export interface ConversationSaveInterface {
  company_id: string;
  user_id_a: string;
  user_id_b: string;
}

export interface ConversationListInterface {
  id: string;
  user_id_a: string;
  user_id_b: string;
  created_at: Date;
}

export interface ConversationWithMessagesListInterface {
  id: string;
  user_id_a: string;
  user_id_b: string;
  created_at: Date;
  messages: {
    count: number,
    rows: MessageListInterface[]
  };
}

export interface ConversationResponseClientInterface {
  rows: ConversationListInterface[];
  count: number;
}

export interface ConversationWithMessageResponseClientInterface {
  rows: ConversationWithMessagesListInterface[];
  count: number;
}

export interface ConversationFilterInterface {
  company_id: string;
  user_id: string;
  page?: number;
  limit?: number;
  message_page: number;
  message_limit: number;
}

export interface ConversationByUserIdAUserIdB {
  company_id: string;
  user_id_a: string;
  user_id_b: string;
}