import { create } from "zustand";

const usePasswordStore = create((set) => ({
  passwords: [],
  setPasswords: (passwords) => set({ passwords }),
  showIndividualPassword: (passwordId, password) =>
    set((state) => ({
      passwords: state.passwords.map((p) =>
        p._id === passwordId ? password : p
      ),
    })),
}));

export default usePasswordStore;
