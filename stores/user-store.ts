import { create } from "zustand";

export type UserType = null | {
  id: string;
  email: string;
  password: string;
  fullName: string;
  nickname: string;
  avatar: string;
};

interface BearState {
  user: UserType;
  saveUser: (by: UserType) => void;
}

const useUserDetailStore = create<BearState>()((set) => ({
  user: null,
  saveUser: (user: UserType) => set(() => ({ user })),
}));

export default useUserDetailStore;
