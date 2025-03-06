import { create } from 'zustand';

const useCredentialStore = create((set) => ({
  userId: '',
  username: '',
  password: '',
  role: '',
  firstLogin: null,
  currentQuestionIndex: 0,
  answers: [],
  introState: 'START',
  setUser: (user) =>
    set((state) => {
      console.log(user.userId);
      return {
        ...state,
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
}));

export { useCredentialStore };
