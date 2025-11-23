import { create } from "zustand";

const Store = create((set) => ({
  // user info
  email: "",
  setEmail: (email) => set({ email }),
  password: "",
  setPassword: (password) => set({ password }),
  id_token: "",
  setIdToken: (id_token) => set({ id_token }),
}));

export default Store;