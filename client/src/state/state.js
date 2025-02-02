import { create } from 'zustand';

const useCredentialStore = create((set) => ({
  userId: 'sdfsefsd',
  username: '',
  password: '',
  role: 'therapist',
  firstLogin: false,
  currentQuestionIndex: 0,
  answers: [],
  introState: 'START',
  setID: (user) =>
    set({ userId: user.id, role: user.role, firstLogin: user.firstLogin }),
  setUsername: (username) => set({ username }),
  setPassword: (password) => set({ password }),
  setCurrentQuestionIndex: (number) =>
    set(() => ({ currentQuestionIndex: number })),
  setIntroState: (introValue) => set({ introState: introValue }),
}));

export { useCredentialStore };
