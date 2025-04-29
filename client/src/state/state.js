import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { privateStorage } from './privateStorage';
import { INTRO_STATE_OPTIONS } from '../components/introState';

const useIdentityStore = create(
  persist(
    (set) => ({
      userId: '',
      adminId: '',
      role: '',
      firstLogin: null,
      introState: INTRO_STATE_OPTIONS.START,
      resetUser: () =>
        set(() => ({
          adminId: '',
          userId: '',
          role: '',
          firstLogin: null,
          introState: INTRO_STATE_OPTIONS.START,
        })),
      setUser: (user) =>
        set(() => {
          return {
            adminId: user.adminId ? user.adminId : null,
            userId: user.userId,
            role: user.role,
            firstLogin: user.firstLogin,
          };
        }),
      setIntroState: (introValue) => set(() => ({ introState: introValue })),
    }),
    {
      name: 'chiryo-user',
      storage: createJSONStorage(() => privateStorage),
    },
  ),
);

const useLoginStore = create((set) => ({
  username: '',
  password: '',
  resetLoginStore: () =>
    set(() => ({
      username: '',
      password: '',
    })),
  setUsername: (username) => set(() => ({ username })),
  setPassword: (password) => set(() => ({ password })),
}));

export { useIdentityStore, useLoginStore };
