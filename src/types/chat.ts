import { DecodedMessage } from "@xmtp/xmtp-js";

export interface Message extends DecodedMessage {
  // Any additional properties we might want to add
  isRead?: boolean;
}

export interface ConversationMeta {
  peerAddress: string;
  lastMessage?: Message;
  updatedAt: Date;
  unreadCount: number;
}
