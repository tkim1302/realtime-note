import { create } from 'zustand'

const useStore = create(set => ({
    user: null,
    setUser : (loggedinUser) => set(({ user : loggedinUser })),
}))

export default useStore;