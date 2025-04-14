"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { MainLayout } from "@/components/layout/MainLayout";
import { ConnectButton } from "@/components/auth/ConnectButton";
import { useXmtp } from "./providers/XmtpProvider";

export default function Home() {
  const { isConnected } = useAccount();
  const { isInitialized, initClient } = useXmtp();
  const router = useRouter();

  useEffect(() => {
    if (isConnected && isInitialized) {
      router.push("/chat");
    }
  }, [isConnected, isInitialized, router]);

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center h-full bg-gray-50">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow">
          <h1 className="text-3xl font-bold text-center text-gray-900">
            DeFi Messenger
          </h1>

          <p className="text-center text-gray-600">
            End-to-end encrypted messaging with your Ethereum account
          </p>

          {isConnected && !isInitialized ? (
            <div className="space-y-4">
              <p className="text-center text-gray-600">
                To continue, please initialize your XMTP client.
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
          ) : !isConnected ? (
            <div className="space-y-4">
              <p className="text-center text-gray-600">
                Connect your wallet to get started
              </p>
              <div className="flex justify-center">
                <ConnectButton />
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-t-primary rounded-full animate-spin"></div>
                <span>Pending wallet connection confirmation...</span>
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-2">Features</h2>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-primary"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                End-to-end encryption
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-primary"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Wallet-based identity
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-primary"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Decentralized infrastructure
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-primary"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Message across any platform
              </li>
            </ul>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
