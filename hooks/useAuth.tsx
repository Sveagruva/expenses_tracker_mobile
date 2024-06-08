import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {z} from 'zod';
import {router, useRouter} from 'expo-router';
import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {getAxios} from "@/hooks/getAxios";

const ZUser = z.object({
  id: z.number(),
  login: z.string(),
});

interface AuthState {
  token: string | null;
  user: z.infer<typeof ZUser> | null;
  setToken: (token: string | null) => Promise<void>;
  setUser: (user: z.infer<typeof ZUser> | null) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  user: null,
  setToken: async (token: string | null) => {
    console.log("set token", token)
    if (token != null) {
      await AsyncStorage.setItem('token', token);
    } else {
      await AsyncStorage.removeItem('token');
    }
    set({token});
  },
  setUser: async (user: z.infer<typeof ZUser> | null) => {
    console.log("set user", user)
    set({user});
  }
}));

const ProtectionContext = createContext(false);

export function ProtectedAuthProvider({children}: { children: ReactNode }) {
  return (
    <ProtectionContext.Provider value={true}>
      {children}
    </ProtectionContext.Provider>
  );
}

export function useAuth(): {
  token: string,
  user: z.infer<typeof ZUser>,
  setUser: (user: z.infer<typeof ZUser>) => void,
  setToken: (token: string) => void
} {
  const isProtected = useContext(ProtectionContext);

  if (!isProtected)
    throw new Error("useAuth must be used within an AuthProvider");

  return useAuthStore() as any;
}
