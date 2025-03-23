import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: {},
  setUser: (user) => set({ user }),
}));

export default useAuthStore;
