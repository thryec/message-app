"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { MainLayout } from "@/components/layout/MainLayout";
import { useAccount } from "wagmi";
import { useXmtp } from "../providers/XmtpProvider";
import { useConversations } from "@/hooks/useConversations";
import { Button } from "@/components/ui/Button";

export default function ChatPage() {
  const { isConnected } = useAccount();
  const { isInitialized } = useXmtp();
  const router = useRouter();
  const { conversations, isLoading } = useConversations();

  // If not connected or XMTP not initialized, redirect to home
  useEffect(() => {
    if (!isConnected) {
      router.push("/");
    } else if (isConnected && !isInitialized) {
      router.push("/");
    }
  }, [isConnected, isInitialized, router]);

  return (
    <MainLayout>
      <div className="flex items-center justify-center h-full bg-gray-50">
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-t-primary rounded-full animate-spin"></div>
          </div>
        ) : conversations.length === 0 ? (
          <div className="text-center max-w-md p-8 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No conversations yet
            </h2>
            <p className="text-gray-600 mb-6">
              Start a conversation by entering an Ethereum address
            </p>
            <Button
              onClick={() => router.push("/new-chat")}
              className="px-4 py-2 font-medium text-white bg-primary rounded-md hover:bg-primary-dark"
            >
              Start a conversation
            </Button>
          </div>
        ) : (
          <div className="text-center max-w-md p-8 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Select a conversation
            </h2>
            <p className="text-gray-600 mb-6">
              Choose a conversation from the sidebar or start a new one
            </p>
            <button
              onClick={() => router.push("/new-chat")}
              className="px-4 py-2 font-medium text-white bg-primary rounded-md hover:bg-primary-dark"
            >
              Start a new conversation
            </button>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
