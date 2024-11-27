import { create } from "zustand";

const useStore = create((set) => ({
  user: null,
  note: null,
  setUser: (loggedinUser) => set({ user: loggedinUser }),
  setNote: (newNoteId) => set({ note: newNoteId }),
}));

export default useStore;
