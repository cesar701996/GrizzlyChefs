import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// base "./" keeps every asset path relative, so the built site works on
// GitHub Pages (cesar701996.github.io/GrizzlyChefs/) or any other host.
export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
});
