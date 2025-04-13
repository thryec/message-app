"use client";

import { useState, useEffect, useCallback } from "react";
import { useAccount } from "wagmi";
import { Profile, ProfileMap } from "@/types/profile";
import { getFromStorage, setInStorage } from "@/lib/utils";

export function useProfile() {
  const { address } = useAccount();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [profiles, setProfiles] = useState<ProfileMap>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Save profile data (in localStorage for MVP)
  const saveProfile = useCallback(
    async (profileData: Profile) => {
      if (!address) throw new Error("Wallet not connected");

      try {
        setIsLoading(true);
        setError(null);

        // For MVP, just save in localStorage
        const newProfile = {
          ...profileData,
          updatedAt: new Date().toISOString(),
        };

        // Save to localStorage
        setInStorage(`profile-${address.toLowerCase()}`, newProfile);

        // Update local state
        setProfile(newProfile);
        setProfiles((prev) => ({
          ...prev,
          [address.toLowerCase()]: newProfile,
        }));

        return true;
      } catch (err) {
        console.error("Error saving profile", err);
        setError(
          err instanceof Error ? err : new Error("Failed to save profile")
        );
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [address]
  );

  // Fetch my profile from localStorage
  const fetchMyProfile = useCallback(async () => {
    if (!address) return;

    try {
      setIsLoading(true);
      setError(null);

      // Try to get from localStorage
      const storedProfile = getFromStorage<Profile | null>(
        `profile-${address.toLowerCase()}`,
        null
      );

      if (storedProfile) {
        setProfile(storedProfile);
        setProfiles((prev) => ({
          ...prev,
          [address.toLowerCase()]: storedProfile,
        }));
        return storedProfile;
      }

      // If not in localStorage, create a default profile
      const defaultProfile: Profile = {
        name: `User ${address.substring(0, 6)}`,
        updatedAt: new Date().toISOString(),
      };

      setProfile(defaultProfile);
      setProfiles((prev) => ({
        ...prev,
        [address.toLowerCase()]: defaultProfile,
      }));

      // Save the default profile
      setInStorage(`profile-${address.toLowerCase()}`, defaultProfile);

      return defaultProfile;
    } catch (err) {
      console.error("Error fetching profile", err);
      setError(
        err instanceof Error ? err : new Error("Failed to fetch profile")
      );
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [address]);

  // Get profile for a given address
  const getProfile = useCallback(
    async (profileAddress: string) => {
      if (!profileAddress) return null;

      const normalizedAddress = profileAddress.toLowerCase();

      // Check if we already have it cached in memory
      if (profiles[normalizedAddress]) {
        return profiles[normalizedAddress];
      }

      try {
        // Check if we have it in localStorage
        const storedProfile = getFromStorage<Profile | null>(
          `profile-${normalizedAddress}`,
          null
        );

        if (storedProfile) {
          // Update profiles cache
          setProfiles((prev) => ({
            ...prev,
            [normalizedAddress]: storedProfile,
          }));
          return storedProfile;
        }

        // For MVP, just create a default profile with truncated address
        const defaultProfile: Profile = {
          name: `User ${profileAddress.substring(0, 6)}`,
          updatedAt: new Date().toISOString(),
        };

        // Update profiles cache
        setProfiles((prev) => ({
          ...prev,
          [normalizedAddress]: defaultProfile,
        }));

        return defaultProfile;
      } catch (err) {
        console.error(`Error fetching profile for ${profileAddress}`, err);
        return null;
      }
    },
    [profiles]
  );

  // Load my profile on account change
  useEffect(() => {
    if (address) {
      fetchMyProfile();
    } else {
      setProfile(null);
    }
  }, [address, fetchMyProfile]);

  return {
    profile,
    profiles,
    isLoading,
    error,
    saveProfile,
    fetchMyProfile,
    getProfile,
  };
}
