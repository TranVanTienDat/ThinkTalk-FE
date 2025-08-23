import { create } from "zustand";

export type UserType = {
  id: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  fullName: string;
  nickname: string;
  avatar: string;
};

interface BearState {
  user: UserType | null;
  saveUser: (by: UserType | null) => void;
}

const useUserDetailStore = create<BearState>()((set) => ({
  user: null,
  saveUser: (user: UserType | null) => set(() => ({ user })),
}));

export default useUserDetailStore;
