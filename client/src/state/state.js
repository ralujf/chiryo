import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCredentialStore = create(
  persist((set) => ({
    userId: '',
    adminId: null,
    username: '',
    password: '',
    role: '',
    firstLogin: null,
    currentQuestionIndex: 0,
    answers: [],
    introState: 'START',
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
  })),
);

export { useCredentialStore };
