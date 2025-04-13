import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useXmtp } from "../../hooks/useXmtp";
import { useConversations } from "@/hooks/useConversations";
import { useMessages } from "@/hooks/useMessage";
import { useProfile } from "../../hooks/useProfile";
import { ChatHeader } from "./ChatHeader";
import { ChatInput } from "./ChatInput";
import { MessageBubble } from "./MessageBubble";

interface ConversationViewProps {
  peerAddress: string;
}

export const ConversationView: React.FC<ConversationViewProps> = ({
  peerAddress,
}) => {
  const router = useRouter();
  const { client } = useXmtp();
  const { startConversation, conversations } = useConversations();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Find existing conversation or create a new one
  const conversation = conversations.find(
    (convo) => convo.peerAddress === peerAddress
  );

  const {
    messages,
    sendMessage,
    isLoading: isLoadingMessages,
  } = useMessages(conversation);

  const { getProfile, profiles } = useProfile();

  const peerProfile = peerAddress ? profiles[peerAddress as string] : null;

  // Load peer profile if not already loaded
  useEffect(() => {
    if (peerAddress && !peerProfile) {
      getProfile(peerAddress as string);
    }
  }, [peerAddress, peerProfile, getProfile]);

  // Create a conversation if it doesn't exist
  useEffect(() => {
    const initConversation = async () => {
      if (client && peerAddress && !conversation) {
        try {
          await startConversation(peerAddress as string);
        } catch (err) {
          console.error("Failed to start conversation", err);
          router.push("/");
        }
      }
    };

    initConversation();
  }, [client, peerAddress, conversation, startConversation, router]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle sending a message
  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    try {
      await sendMessage(content);
    } catch (err) {
      console.error("Failed to send message", err);
    }
  };

  if (!peerAddress) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Select a conversation</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <ChatHeader
        peerAddress={peerAddress as string}
        peerName={
          peerProfile?.name || `${(peerAddress as string).substring(0, 6)}...`
        }
      />

      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {isLoadingMessages ? (
          <div className="flex justify-center p-4">
            <div className="w-6 h-6 border-2 border-t-primary rounded-full animate-spin"></div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <p>No messages yet</p>
            <p className="text-sm">Send a message to start the conversation</p>
          </div>
        ) : (
          <div className="space-y-2">
            {messages.map((message: any) => (
              <MessageBubble
                key={message.id}
                message={message}
                isFromMe={message.senderAddress === client?.address}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};
