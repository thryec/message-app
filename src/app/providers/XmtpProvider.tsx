"use client";

import {
  createContext,
  ReactNode,
  useState,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { Client } from "@xmtp/xmtp-js";
import { useAccount, useWalletClient, useDisconnect } from "wagmi";
import { type WalletClient } from "viem";

// Function to adapt wallet client for XMTP
function adaptWalletClient(walletClient: WalletClient) {
  if (!walletClient?.account) {
    throw new Error("Wallet client or account is not defined");
  }

  return {
    // Ensure getAddress always returns a Promise<string> (not undefined)
    getAddress: async () => {
      const address = walletClient?.account?.address;
      if (!address) throw new Error("No address found");
      return address;
    },

    // Make sure signMessage returns the correct type
    signMessage: async (message: string) => {
      if (
        !walletClient.account ||
        typeof walletClient.account.address !== "string"
      ) {
        throw new Error("Invalid account");
      }

      const signature = await walletClient.signMessage({
        account: walletClient.account,
        message,
      });
      return signature;
    },
  };
}

interface XmtpContextType {
  client: Client | null;
  isLoading: boolean;
  error: Error | null;
  initClient: () => Promise<void>;
  disconnect: () => void;
  isInitialized: boolean;
}

const XmtpContext = createContext<XmtpContextType>({
  client: null,
  isLoading: false,
  error: null,
  initClient: async () => {},
  disconnect: () => {},
  isInitialized: false,
});

export const useXmtp = () => useContext(XmtpContext);

interface XmtpProviderProps {
  children: ReactNode;
}

export function XmtpProvider({ children }: XmtpProviderProps) {
  const { isConnected, address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const { disconnect: disconnectWallet } = useDisconnect();
  const [client, setClient] = useState<Client | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const initClient = useCallback(async () => {
    if (!walletClient || !isConnected || !address) return;

    try {
      setIsLoading(true);
      setError(null);

      // Create an adapter for the wallet client
      const signer = adaptWalletClient(walletClient);
      if (!signer) {
        throw new Error("Failed to adapt wallet client for XMTP");
      }

      // Create the XMTP client
      const xmtpClient = await Client.create(signer, { env: "production" });
      setClient(xmtpClient);

      // Save in localStorage that client has been initialized for this address
      localStorage.setItem(`xmtp:initialized:${address}`, "true");
    } catch (err) {
      console.error("Error initializing XMTP client", err);
      setError(
        err instanceof Error ? err : new Error("Failed to initialize XMTP")
      );
    } finally {
      setIsLoading(false);
    }
  }, [walletClient, isConnected, address]);

  // Disconnect client
  const disconnect = useCallback(() => {
    setClient(null);
    disconnectWallet();
    if (address) {
      localStorage.removeItem(`xmtp:initialized:${address}`);
    }
  }, [address]);

  // Check if client is already initialized for this address
  useEffect(() => {
    if (address && isConnected) {
      const isInitialized =
        localStorage.getItem(`xmtp:initialized:${address}`) === "true";

      if (isInitialized && !client && !isLoading) {
        initClient();
      }
    }
  }, [address, isConnected, client, isLoading, initClient]);

  // Reset client when wallet disconnects
  useEffect(() => {
    if (!isConnected && client) {
      disconnect();
    }
  }, [isConnected, client, disconnect]);

  return (
    <XmtpContext.Provider
      value={{
        client,
        isLoading,
        error,
        initClient,
        disconnect,
        isInitialized: !!client,
      }}
    >
      {children}
    </XmtpContext.Provider>
  );
}
