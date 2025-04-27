import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: import.meta.env.PROD
      ? import.meta.env.VITE_API_URL + '/'
      : 'http://localhost:5173',
    setupNodeEvents() {
      // implement node event listeners here
    },
  },
});
