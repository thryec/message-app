"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { Button } from "../ui/Button";
import { injected } from "wagmi/connectors";
import { useXmtp } from "@/app/providers/XmtpProvider";

export const ConnectButton = () => {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const { connect, isPending } = useConnect();
  const { disconnect: disconnectXmtp } = useXmtp();
  const { disconnect } = useDisconnect();
  const [mounted, setMounted] = useState(false);

  const handleDisconnect = () => {
    disconnectXmtp();
    disconnect();
    router.push("/");
  };

  // To avoid hydration mismatch, only render after mounting on client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (isConnected && address) {
    return (
      <div className="flex items-center">
        <span className="mr-2 text-sm text-gray-700">
          {address?.substring(0, 6)}...{address?.substring(address.length - 4)}
        </span>
        <Button
          onClick={() => handleDisconnect()}
          variant="secondary"
          size="sm"
        >
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={() => connect({ connector: injected() })}
      isLoading={isPending}
      className="bg-black text-white"
    >
      Connect Wallet
    </Button>
  );
};
