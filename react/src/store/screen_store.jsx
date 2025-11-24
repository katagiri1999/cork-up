import { create } from "zustand";
import { persist } from 'zustand/middleware';

const screenStore = create(persist((set) => ({
  // screen info
  isLoginError: false,
  setLoginError: (isLoginError) => set({ isLoginError }),
  isLoading: false,
  setLoading: (isLoading) => set({ isLoading }),
  isOpenProfile: false,
  setOpenProfile: (isOpenProfile) => set({ isOpenProfile }),
}), {
  name: "screen-store"
}));

export default screenStore;