"use client";

import { useRouter } from "next/navigation";
import { useDisconnect } from "wagmi";
import { useXmtp } from "@/app/providers/XmtpProvider";
import { ConnectButton } from "../auth/ConnectButton";

export const TopBar = () => {
  const { disconnect: disconnectXmtp } = useXmtp();
  const { disconnect } = useDisconnect();
  const router = useRouter();

  const handleDisconnect = () => {
    disconnectXmtp();
    disconnect();
    router.push("/");
  };

  return (
    <header className="flex items-center justify-between h-16 px-6 border-b border-gray-200 bg-white">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-gray-900">DeFi Messenger</h1>
      </div>
      <div className="flex items-center space-x-4">
        <ConnectButton />
        <button
          onClick={handleDisconnect}
          className="px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          Disconnect
        </button>
      </div>
    </header>
  );
};
