"use client";

import { useState, useEffect, useCallback } from "react";
import { Conversation, DecodedMessage } from "@xmtp/xmtp-js";
import { useXmtp } from "@/app/providers/XmtpProvider";

export function useMessages(conversation?: Conversation) {
  const { client } = useXmtp();
  const [messages, setMessages] = useState<DecodedMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Fetch message history
  const fetchMessages = useCallback(async () => {
    if (!conversation || !client) return;

    try {
      setIsLoading(true);
      setError(null);
      const messageList = await conversation.messages();
      setMessages(messageList);
    } catch (err) {
      console.error("Error fetching messages", err);
      setError(
        err instanceof Error ? err : new Error("Failed to fetch messages")
      );
    } finally {
      setIsLoading(false);
    }
  }, [conversation, client]);

  // Send a message
  const sendMessage = useCallback(
    async (content: string) => {
      if (!conversation) throw new Error("No conversation selected");
      if (!client) throw new Error("XMTP client not initialized");

      try {
        const sentMessage = await conversation.send(content);
        setMessages((prev) => [...prev, sentMessage]);
        return sentMessage;
      } catch (err) {
        console.error("Error sending message", err);
        throw err;
      }
    },
    [conversation, client]
  );

  // Stream new messages in conversation
  useEffect(() => {
    if (!conversation || !client) return;

    let isMounted = true;

    const streamMessages = async () => {
      const stream = await conversation.streamMessages();

      for await (const message of stream) {
        if (!isMounted) break;

        setMessages((prev) => {
          // Check if message already exists (avoid duplicates)
          const exists = prev.some((m) => m.id === message.id);

          if (!exists) {
            return [...prev, message];
          }

          return prev;
        });
      }
    };

    streamMessages();

    return () => {
      isMounted = false;
    };
  }, [conversation, client]);

  // Initial fetch
  useEffect(() => {
    if (conversation && client) {
      fetchMessages();
    }
  }, [conversation, client, fetchMessages]);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    fetchMessages,
  };
}
