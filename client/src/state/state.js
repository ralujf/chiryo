import { create } from 'zustand';

const useCredentialStore = create((set) => ({
  username: '',
  password: '',
  setUsername: (username) => set({ username }),
  setPassword: (password) => set({ password }),
}));

export { useCredentialStore };
