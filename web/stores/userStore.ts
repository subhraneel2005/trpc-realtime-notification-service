import { UserPayload } from "@trpc/type/User";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserStore {
  token: string | null;
  userPayload: UserPayload | null;
  setToken: (token: string | null) => void;
  setUserPayload: (user: UserPayload | null) => void;
  clearUser: () => void;
  isAuthenticated: boolean;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      token: null,
      userPayload: null,
      isAuthenticated: false,

      setToken: (token) =>
        set({
          token,
          isAuthenticated: !!token,
        }),

      setUserPayload: (user) =>
        set({
          userPayload: user,
        }),

      clearUser: () =>
        set({
          token: null,
          userPayload: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
