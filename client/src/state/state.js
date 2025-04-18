import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { privateStorage } from './privateStorage';

const useCredentialStore = create(
  persist(
    (set) => ({
      userId: 'fake',
      adminId: 'fake',
      username: '',
      password: '',
      role: 'user',
      firstLogin: null,
      currentQuestionIndex: 0,
      answers: [],
      introState: 'GENCRED',
      setUser: (user) =>
        set(() => {
          return {
            adminId: user.adminId ? user.adminId : null,
            userId: user.userId,
            role: user.role,
            firstLogin: user.firstLogin,
          };
        }),
      setUsername: (username) => set((state) => ({ ...state, username })),
      setPassword: (password) => set((state) => ({ ...state, password })),
      setCurrentQuestionIndex: (number) =>
        set((state) => ({ ...state, currentQuestionIndex: number })),
      setIntroState: (introValue) =>
        set((state) => ({ ...state, introState: introValue })),
    }),
    {
      name: 'chiryo-user',
      storage: createJSONStorage(() => privateStorage),
    },
  ),
);

export { useCredentialStore };
