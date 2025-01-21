import { create } from "zustand";
import type { Session, User } from "better-auth";

interface AuthStore {
    session: Session | null;
    user: User | null;
    isLoading: boolean;
    setSession: (session: Session | null) => void;
    setUser: (user: User | null) => void;
    setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    session: null,
    user: null,
    isLoading: true,
    setSession: (session) => set({ session }),
    setUser: (user) => set({ user }),
    setLoading: (loading) => set({ isLoading: loading }),
}));
