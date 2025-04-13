import { useMemo } from "react";
import Image from "next/image";

interface AvatarProps {
  address: string;
  size?: number;
  className?: string;
  image?: string;
}

export const Avatar = ({
  address,
  size = 40,
  className = "",
  image,
}: AvatarProps) => {
  // Generate a deterministic color based on the address
  const backgroundColor = useMemo(() => {
    if (!address) return "#E2E8F0";

    // Simple hash function for the address
    const hash = Array.from(address.toLowerCase()).reduce(
      (acc, char) => acc + char.charCodeAt(0),
      0
    );

    // List of colors (tailwind-inspired)
    const colors = [
      "#3B82F6", // blue-500
      "#10B981", // emerald-500
      "#F59E0B", // amber-500
      "#EF4444", // red-500
      "#EC4899", // pink-500
      "#8B5CF6", // violet-500
      "#6366F1", // indigo-500
      "#14B8A6", // teal-500
    ];

    return colors[hash % colors.length];
  }, [address]);

  // Get initials from address
  const initials = useMemo(() => {
    if (!address) return "";
    return `${address.substring(2, 4).toUpperCase()}`;
  }, [address]);

  if (image) {
    return (
      <div
        className={`relative rounded-full overflow-hidden ${className}`}
        style={{ width: size, height: size }}
      >
        <Image
          src={image}
          alt="Avatar"
          width={size}
          height={size}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-center rounded-full text-white font-medium ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor,
        fontSize: Math.max(size / 2.5, 12),
      }}
    >
      {initials}
    </div>
  );
};
