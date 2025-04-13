"use client";

import { ReactNode, useState, useEffect } from "react";
import { createConfig, http } from "wagmi";
import { mainnet, polygon, optimism } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider as WagmiCoreProvider } from "wagmi";
import { injected, metaMask, walletConnect } from "wagmi/connectors";

// Create wagmi config for v2

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
if (!projectId) {
  console.warn("WalletConnect ProjectId not set in environment variables");
}

const config = createConfig({
  chains: [mainnet, polygon, optimism],
  transports: {
    [mainnet.id]: http(
      "https://eth-mainnet.g.alchemy.com/v2/NEXT_PUBLIC_ALCHEMY_API_KEY"
    ),
    [polygon.id]: http(
      "https://polygon-mainnet.g.alchemy.com/v2/NEXT_PUBLIC_ALCHEMY_API_KEY"
    ),
    [optimism.id]: http(
      "https://opt-mainnet.g.alchemy.com/v2/NEXT_PUBLIC_ALCHEMY_API_KEY"
    ),
  },
  connectors: [
    injected(),
    metaMask(),
    walletConnect({
      projectId: projectId || "",
      metadata: {
        name: "DeFi Messenger",
        description: "Decentralized encrypted messaging app",
        url: "http://localhost:3000",
        icons: ["https://defi-messenger.app/icon.png"],
      },
    }),
  ],
});

// Create react-query client
const queryClient = new QueryClient();

interface WagmiProviderProps {
  children: ReactNode;
}

export function WagmiProvider({ children }: WagmiProviderProps) {
  const [mounted, setMounted] = useState(false);

  // To avoid hydration mismatch, only render after mounting on client
  useEffect(() => {
    setMounted(true);
  }, [mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <WagmiCoreProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiCoreProvider>
  );
}
