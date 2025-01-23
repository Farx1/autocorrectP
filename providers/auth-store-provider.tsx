"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";
import { create } from "zustand";
import type { Session, User } from "better-auth";

// Define the store type
interface AuthStore {
    session: Session | null;
    user: User | null;
    isLoading: boolean;
    setSession: (session: Session | null) => void;
    setUser: (user: User | null) => void;
    setLoading: (loading: boolean) => void;
}

// Create store factory function
const createAuthStore = (initState: Partial<AuthStore> = {}) => {
    return create<AuthStore>((set) => ({
        session: null,
        user: null,
        isLoading: true,
        ...initState,
        setSession: (session) => set({ session }),
        setUser: (user) => set({ user }),
        setLoading: (loading) => set({ isLoading: loading }),
    }));
};

// Create context
export type AuthStoreApi = ReturnType<typeof createAuthStore>;
export const AuthStoreContext = createContext<AuthStoreApi | null>(null);

// Provider component
export interface AuthStoreProviderProps {
    children: ReactNode;
    initialState?: Partial<AuthStore>;
}

export const AuthStoreProvider = ({
    children,
    initialState = {},
}: AuthStoreProviderProps) => {
    // Using MutableRefObject instead of RefObject
    const storeRef = useRef<AuthStoreApi | null>(null);
    
    if (storeRef.current === null) {
        storeRef.current = createAuthStore(initialState);
    }

    return (
        <AuthStoreContext.Provider value={storeRef.current}>
            {children}
        </AuthStoreContext.Provider>
    );
};

// Hook to use the store
export const useAuthStore = <T,>(selector: (store: AuthStore) => T): T => {
    const authStoreContext = useContext(AuthStoreContext);

    if (!authStoreContext) {
        throw new Error(`useAuthStore must be used within AuthStoreProvider`);
    }

    return useStore(authStoreContext, selector);
};
