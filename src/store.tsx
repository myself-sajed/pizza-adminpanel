import { create } from 'zustand'
import { devtools } from 'zustand/middleware'


export interface UserInfo {
    id: number
    email: string,
    name: string,
    role: string,
    tenant: {
        id: number,
        name: string
        address: string,
    },
}

interface User {
    user: UserInfo | null,
    setUser: (user: UserInfo) => void
    logoutUser: () => void
}


export const useAuthStore = create<User>()(devtools(
    (set) => ({
        user: null,
        setUser: (user) => set({ user }),
        logoutUser: () => set({ user: null }),
    })))

