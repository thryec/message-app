import { DecodedMessage } from "@xmtp/xmtp-js";
import { formatDateTime } from "../../lib/utils";

interface MessageBubbleProps {
  message: DecodedMessage;
  isFromMe: boolean;
}

export const MessageBubble = ({ message, isFromMe }: MessageBubbleProps) => {
  return (
    <div className={`flex ${isFromMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] p-3 rounded-lg ${
          isFromMe
            ? "bg-chat-sent text-gray-800"
            : "bg-chat-received text-gray-800"
        }`}
      >
        <p className="whitespace-pre-wrap break-words">{message.content}</p>
        <div
          className={`text-xs mt-1 ${isFromMe ? "text-gray-600" : "text-gray-500"}`}
        >
          {formatDateTime(message.sent)}
        </div>
      </div>
    </div>
  );
};
