"use client";

import { useState, useEffect } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { Button } from "../ui/Button";
import { injected } from "wagmi/connectors";

export const ConnectButton = () => {
  const { address, isConnected } = useAccount();
  const { connect, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const [mounted, setMounted] = useState(false);

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
        <Button onClick={() => disconnect()} variant="secondary" size="sm">
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={() => connect({ connector: injected() })}
      isLoading={isPending}
      size="md"
    >
      Connect Wallet
    </Button>
  );
};
