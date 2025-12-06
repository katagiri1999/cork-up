import { create } from "zustand";
import { persist } from 'zustand/middleware';

const userStore = create(persist((set) => ({
  // user info
  email: "",
  password: "",
  id_token: "",
  tree: "",

  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setIdToken: (id_token) => set({ id_token }),
  setTree: (tree) => set({ tree }),

  reset: () => set({
    email: "",
    password: "",
    id_token: "",
    tree: "",
  }),

}), {
  name: "user-store"
}));

export default userStore;