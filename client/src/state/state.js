import { create } from 'zustand';

const useCredentialStore = create((set) => ({
  userId: '',
  username: '',
  password: '',
  role: '',
  setID: (id) => set({ userId: id }),
  setUsername: (username) => set({ username }),
  setPassword: (password) => set({ password }),
  setRole: (role) => set({ role }),
}));

export { useCredentialStore };
