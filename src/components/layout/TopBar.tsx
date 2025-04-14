"use client";

import { ConnectButton } from "../auth/ConnectButton";

export const TopBar = () => {
  return (
    <header className="flex items-center justify-between h-16 px-6 border-b border-gray-200 bg-white">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-gray-900">DeFi Messenger</h1>
      </div>
      <div className="flex items-center space-x-4">
        <ConnectButton />
      </div>
    </header>
  );
};
