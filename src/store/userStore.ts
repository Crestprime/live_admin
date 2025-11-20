// src/store/useCounterStore.ts
import { IUser } from '@/models/user';
import { create } from 'zustand'; 

interface UserState { 
    userDetails: IUser | null;
    setUserDetails: (userDetails: IUser) => void;
}

export const useUserStore = create<UserState>((set) => ({ 
    userDetails: {} as IUser,  
    setUserDetails: (userDetails: IUser) => set({ userDetails }), 
}));
