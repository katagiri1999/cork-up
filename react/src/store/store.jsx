import { create } from "zustand";
import { persist } from 'zustand/middleware';

const Store = create(persist((set) => ({
  // user info
  email: "",
  setEmail: (email) => set({ email }),
  password: "",
  setPassword: (password) => set({ password }),
  id_token: "",
  setIdToken: (id_token) => set({ id_token }),
}), {
  name: "user-store"
}));

export default Store;