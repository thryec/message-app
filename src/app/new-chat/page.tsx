"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { isAddress } from "viem";
import { useAccount } from "wagmi";
import { MainLayout } from "@/components/layout/MainLayout";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useXmtp } from "../providers/XmtpProvider";
import { useConversations } from "@/hooks/useConversations";

export default function NewChatPage() {
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { address: myAddress } = useAccount();
  const { client } = useXmtp();
  const { startConversation } = useConversations();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset error
    setError("");

    // Validate input
    if (!address.trim()) {
      setError("Please enter an Ethereum address");
      return;
    }

    // Check if valid Ethereum address
    if (!isAddress(address)) {
      setError("Please enter a valid Ethereum address");
      return;
    }

    // Check if trying to message self
    if (myAddress && address.toLowerCase() === myAddress.toLowerCase()) {
      setError("You cannot message yourself");
      return;
    }

    // Start conversation
    try {
      setIsLoading(true);

      // Check if peer can be messaged via XMTP
      const canMessage = await client?.canMessage(address);
      if (!canMessage) {
        setError("This address has not yet registered with XMTP");
        setIsLoading(false);
        return;
      }

      // Start the conversation
      await startConversation(address);

      // Navigate to conversation
      router.push(`/chat/${address}`);
    } catch (err) {
      console.error("Failed to start conversation", err);
      setError("Failed to start conversation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center h-full p-4 bg-gray-50">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow">
          <h1 className="mb-6 text-2xl font-bold text-center">
            New Conversation
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Input
                label="Recipient Address"
                placeholder="0x..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                error={error}
                fullWidth
              />
            </div>

            <div className="flex space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/chat")}
                fullWidth
              >
                Cancel
              </Button>

              <Button
                type="submit"
                isLoading={isLoading}
                disabled={!address.trim() || isLoading}
                fullWidth
              >
                Start Chat
              </Button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}
