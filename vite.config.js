// This file tells Vite to use its official React plugin for JSX and fast refresh.
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite uses this small configuration for both local development and production builds.
export default defineConfig({
  plugins: [react()],
});
