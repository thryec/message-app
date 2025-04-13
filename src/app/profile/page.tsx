"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { MainLayout } from "@/components/layout/MainLayout";
import { Avatar } from "@/components/ui/Avatar";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useProfile } from "@/hooks/useProfile";
import { useXmtp } from "../providers/XmtpProvider";

export default function ProfilePage() {
  const { address } = useAccount();
  const { profile, saveProfile, isLoading: isProfileLoading } = useProfile();
  const { isInitialized } = useXmtp();
  const router = useRouter();

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Load profile data when available
  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setBio(profile.bio || "");
    }
  }, [profile]);

  // If XMTP not initialized, redirect to home
  useEffect(() => {
    if (!isInitialized) {
      router.push("/");
    }
  }, [isInitialized, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return;

    try {
      setIsLoading(true);
      setIsSaved(false);

      await saveProfile({
        name: name.trim(),
        bio: bio.trim(),
      });

      setIsSaved(true);

      // Reset after 3 seconds
      setTimeout(() => setIsSaved(false), 3000);
    } catch (error) {
      console.error("Failed to save profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isProfileLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-full">
          <div className="w-8 h-8 border-4 border-t-primary rounded-full animate-spin"></div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center h-full p-4 bg-gray-50">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow">
          <div className="flex flex-col items-center mb-6">
            <Avatar address={address || ""} size={80} className="mb-3" />
            <p className="text-sm text-gray-500">
              {address
                ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
                : ""}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Input
                label="Display Name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                required
              />
            </div>

            <div className="mb-6">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Bio (optional)
              </label>
              <textarea
                placeholder="Tell others a bit about yourself"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/25"
                rows={3}
              />
            </div>

            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/chat")}
              >
                Back
              </Button>

              <Button
                type="submit"
                isLoading={isLoading}
                disabled={!name.trim() || isLoading}
              >
                {isSaved ? "Saved!" : "Save Profile"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}
