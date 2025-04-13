"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { useXmtp } from "../../providers/XmtpProvider";
import { MainLayout } from "@/components/layout/MainLayout";
import { ConversationView } from "@/components/chat/ConversationView";

export default function ChatDetailPage() {
  const { address } = useParams();
  const { isConnected } = useAccount();
  const { isInitialized } = useXmtp();
  const router = useRouter();

  // If not connected or XMTP not initialized, redirect to home
  useEffect(() => {
    if (!isConnected) {
      router.push("/");
    } else if (isConnected && !isInitialized) {
      router.push("/");
    }
  }, [isConnected, isInitialized, router]);

  if (!address || Array.isArray(address)) {
    return null;
  }

  return (
    <MainLayout>
      <ConversationView peerAddress={address} />
    </MainLayout>
  );
}
