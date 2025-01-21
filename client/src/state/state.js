import { create } from 'zustand';

const useCredentialStore = create((set) => ({
  userId: '',
  username: '',
  password: '',
  role: '',
  firstLogin: false,
  setID: (user) =>
    set({ userId: user.id, setRole: user.role, firstLogin: user.firstLogin }),
  setUsername: (username) => set({ username }),
  setPassword: (password) => set({ password }),
}));

export { useCredentialStore };
