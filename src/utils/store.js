import { create } from "zustand";

const useStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user: user });
  },
}));

export default useStore;
