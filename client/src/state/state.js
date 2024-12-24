import { create } from 'zustand';

const useCredentialStore = create((set) => ({
  username: '',
  password: '',
  role: '',
  setUsername: (username) => set({ username }),
  setPassword: (password) => set({ password }),
  setRole: (role) => set({ role }),
}));

export { useCredentialStore };
