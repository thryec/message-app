"use client";

import { ReactNode, useState, useEffect } from "react";
import { createConfig, http } from "wagmi";
import { mainnet, polygon, optimism } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider as WagmiCoreProvider } from "wagmi";
import { injected, metaMask, walletConnect } from "wagmi/connectors";

// Create wagmi config for v2
const config = createConfig({
  chains: [mainnet, polygon, optimism],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [optimism.id]: http(),
  },
  connectors: [
    injected(),
    metaMask(),
    walletConnect({
      projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "",
      metadata: {
        name: "DeFi Messenger",
        description: "Decentralized encrypted messaging app",
        url: "https://defi-messenger.app",
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
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <WagmiCoreProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiCoreProvider>
  );
}
