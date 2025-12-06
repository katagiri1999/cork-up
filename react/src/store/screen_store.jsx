import { create } from "zustand";
import { persist } from 'zustand/middleware';

const screenStore = create(persist((set) => ({
  // screen info
  isLoginError: false,
  isLoading: false,
  isOpenProfile: false,

  setLoginError: (isLoginError) => set({ isLoginError }),
  setLoading: (isLoading) => set({ isLoading }),
  setOpenProfile: (isOpenProfile) => set({ isOpenProfile }),

  reset: () => set({
    isLoginError: false,
    isLoading: false,
    isOpenProfile: false,
  }),
}), {
  name: "screen-store"
}));

export default screenStore;