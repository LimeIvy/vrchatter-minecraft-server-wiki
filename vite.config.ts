import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        vrchatter_main: resolve(__dirname, "vrchatter-main/index.html"),
        vrchatter_atm9: resolve(__dirname, "vrchatter-atm9/index.html"),
      },
    },
  },
});
