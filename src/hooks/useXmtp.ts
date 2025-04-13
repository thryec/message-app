import { useState, useCallback } from "react";
import { Client } from "@xmtp/xmtp-js";
import { useAccount, useWalletClient } from "wagmi";
import { type WalletClient } from "viem";

function walletClientToSigner(walletClient: WalletClient) {
  if (!walletClient?.account) {
    throw new Error("Wallet client or account is not defined");
  }

  return {
    getAddress: async () => walletClient?.account?.address,
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

export function useXmtp() {
  const { isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [client, setClient] = useState<Client | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const initClient = useCallback(async () => {
    if (!walletClient || !isConnected) return;

    try {
      setIsLoading(true);
      setError(null);

      // Convert viem WalletClient to ethers-compatible signer
      const signer = walletClientToSigner(walletClient);

      // Create the XMTP client
      const xmtpClient = await Client.create(signer, { env: "production" });
      setClient(xmtpClient);
    } catch (err) {
      console.error("Error initializing XMTP client", err);
      setError(
        err instanceof Error ? err : new Error("Failed to initialize XMTP")
      );
    } finally {
      setIsLoading(false);
    }
  }, [walletClient, isConnected]);

  // Disconnect client
  const disconnect = useCallback(() => {
    setClient(null);
  }, []);

  return {
    client,
    isLoading,
    error,
    initClient,
    disconnect,
    isInitialized: !!client,
  };
}
