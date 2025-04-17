import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  base: "/Drugle/", // Ensure this matches your GitHub Pages repository name
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});