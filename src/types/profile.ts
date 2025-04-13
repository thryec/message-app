export interface Profile {
  name: string;
  avatar?: string;
  bio?: string;
  updatedAt?: string;
}

export interface ProfileMap {
  [address: string]: Profile;
}

export interface StoredProfile {
  cid: string;
  data: Profile;
  updatedAt: string;
}
