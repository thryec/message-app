"use client";

import { ReactNode } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { ConnectButton } from "../auth/ConnectButton";
import { useXmtp } from "../../app/providers/XmtpProvider";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const { isConnected } = useAccount();
  const { isInitialized, initClient } = useXmtp();
  const router = useRouter();

  // If not on home page and not connected, redirect to home
  if (!isConnected && router.pathname !== "/") {
    router.push("/");
    return null;
  }

  // If connected but XMTP not initialized
  if (isConnected && !isInitialized && router.pathname !== "/") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow">
          <h1 className="text-2xl font-bold text-center text-gray-900">
            Initialize XMTP
          </h1>
          <p className="text-center text-gray-600">
            To continue, you need to initialize your XMTP client.
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => initClient()}
              className="px-4 py-2 font-medium text-white bg-primary rounded-md hover:bg-primary-dark"
            >
              Initialize XMTP
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If not connected at all
  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow">
          <h1 className="text-2xl font-bold text-center text-gray-900">
            DeFi Messenger
          </h1>
          <p className="text-center text-gray-600">
            Connect your wallet to start messaging securely.
          </p>
          <div className="flex justify-center">
            <ConnectButton />
          </div>
        </div>
      </div>
    );
  }

  // Main layout with sidebar
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-auto bg-white">{children}</main>
      </div>
    </div>
  );
};
