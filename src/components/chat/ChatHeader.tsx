import { Avatar } from "../ui/Avatar";

interface ChatHeaderProps {
  peerAddress: string;
  peerName: string;
}

export const ChatHeader = ({ peerAddress, peerName }: ChatHeaderProps) => {
  return (
    <div className="flex items-center px-4 py-3 border-b border-gray-200 bg-white">
      <Avatar address={peerAddress} size={40} className="mr-3" />
      <div>
        <h2 className="font-medium">{peerName}</h2>
        <p className="text-xs text-gray-500">
          {peerAddress.substring(0, 6)}...
          {peerAddress.substring(peerAddress.length - 4)}
        </p>
      </div>
    </div>
  );
};
