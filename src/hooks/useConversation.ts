"use client";

import { useState, useEffect, useCallback } from "react";
import { Conversation } from "@xmtp/xmtp-js";
import { useXmtp } from "@/app/providers/XmtpProvider";

export function useConversations() {
  const { client, isInitialized } = useXmtp();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Fetch all conversations
  const fetchConversations = useCallback(async () => {
    if (!client || !isInitialized) return;

    try {
      setIsLoading(true);
      setError(null);
      const convos = await client.conversations.list();
      // Sort by most recent message
      convos.sort((a, b) => {
        const aDate = a.createdAt || new Date(0);
        const bDate = b.createdAt || new Date(0);
        return bDate.getTime() - aDate.getTime();
      });
      setConversations(convos);
    } catch (err) {
      console.error("Error fetching conversations", err);
      setError(
        err instanceof Error ? err : new Error("Failed to fetch conversations")
      );
    } finally {
      setIsLoading(false);
    }
  }, [client, isInitialized]);

  // Start a new conversation
  const startConversation = useCallback(
    async (peerAddress: string) => {
      if (!client) throw new Error("XMTP client not initialized");

      try {
        const conversation =
          await client.conversations.newConversation(peerAddress);

        // Update conversations list with new conversation at the top
        setConversations((prev) => {
          // Check if conversation already exists
          const exists = prev.some(
            (convo) =>
              convo.peerAddress.toLowerCase() === peerAddress.toLowerCase()
          );

          if (!exists) {
            return [conversation, ...prev];
          }

          return prev;
        });

        return conversation;
      } catch (err) {
        console.error("Error starting conversation", err);
        throw err;
      }
    },
    [client]
  );

  // Stream new conversations
  useEffect(() => {
    if (!client || !isInitialized) return;

    let isMounted = true;

    const streamConversations = async () => {
      const stream = await client.conversations.stream();

      for await (const conversation of stream) {
        if (!isMounted) break;

        setConversations((prev) => {
          // Check if conversation already exists
          const exists = prev.some(
            (convo) =>
              convo.peerAddress.toLowerCase() ===
              conversation.peerAddress.toLowerCase()
          );

          if (!exists) {
            return [conversation, ...prev];
          }

          return prev;
        });
      }
    };

    streamConversations();

    return () => {
      isMounted = false;
    };
  }, [client, isInitialized]);

  // Initial fetch
  useEffect(() => {
    if (isInitialized && client) {
      fetchConversations();
    }
  }, [isInitialized, client, fetchConversations]);

  return {
    conversations,
    isLoading,
    error,
    fetchConversations,
    startConversation,
  };
}
