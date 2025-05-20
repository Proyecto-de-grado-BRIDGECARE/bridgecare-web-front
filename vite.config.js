import basicSsl from '@vitejs/plugin-basic-ssl';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [basicSsl()],
  server: {
    allowedHosts: ['bridgecare.com.co'],
    https: true
  }
});
