"use client";

import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { useConversations } from "@/hooks/useConversations";
import { useProfile } from "../../hooks/useProfile";
import { Avatar } from "../ui/Avatar";
import { formatRelativeTime } from "../../lib/utils";

export const Sidebar = () => {
  const router = useRouter();
  const { address } = useAccount();
  const { conversations, isLoading: isLoadingConversations } =
    useConversations();
  const { getProfile, profiles } = useProfile();

  const navigateToChat = (peerAddress: string) => {
    router.push(`/chat/${peerAddress}`);
  };

  const navigateToProfile = () => {
    router.push("/profile");
  };

  return (
    <aside className="flex flex-col w-80 border-r border-gray-200 bg-white">
      {/* User profile section */}
      <div className="p-4 border-b border-gray-200">
        <div
          className="flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-100"
          onClick={navigateToProfile}
        >
          <Avatar address={address || ""} size={40} className="mr-3" />
          <div className="flex-1">
            <h3 className="font-medium">My Profile</h3>
            <p className="text-sm text-gray-500 truncate">
              {address
                ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
                : ""}
            </p>
          </div>
        </div>
      </div>

      {/* Conversations list */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-700">Messages</h2>
        </div>

        {isLoadingConversations ? (
          <div className="flex justify-center p-4">
            <div className="w-6 h-6 border-2 border-t-primary rounded-full animate-spin"></div>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {conversations.length === 0 ? (
              <li className="p-4 text-center text-gray-500">
                No conversations yet
              </li>
            ) : (
              conversations.map((conversation) => {
                const peerAddress = conversation.peerAddress;
                const profile = profiles[peerAddress] || {
                  name: `${peerAddress.substring(0, 6)}...`,
                };

                // Load profile if not already loaded
                if (!profiles[peerAddress]) {
                  getProfile(peerAddress);
                }

                return (
                  <li
                    key={peerAddress}
                    className={`px-4 py-3 cursor-pointer hover:bg-gray-100 ${
                      router.query.address === peerAddress ? "bg-gray-100" : ""
                    }`}
                    onClick={() => navigateToChat(peerAddress)}
                  >
                    <div className="flex items-center">
                      <Avatar
                        address={peerAddress}
                        size={48}
                        className="mr-3"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium truncate">
                            {profile.name}
                          </h3>
                          {conversation.createdAt && (
                            <span className="text-xs text-gray-500">
                              {formatRelativeTime(conversation.createdAt)}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 truncate">
                          {peerAddress.substring(0, 6)}...
                          {peerAddress.substring(peerAddress.length - 4)}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })
            )}
          </ul>
        )}
      </div>

      {/* New message button */}
      <div className="p-4 border-t border-gray-200">
        <button
          className="w-full py-2 text-white bg-primary rounded-md hover:bg-primary-dark"
          onClick={() => router.push("/new-chat")}
        >
          New Message
        </button>
      </div>
    </aside>
  );
};
