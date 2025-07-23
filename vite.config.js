import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: ".",
  build: {
    outDir: "./build",
    emptyOutDir: true,
  },
  base: "/",
  server: {
    port: 3000, // Đặt cổng chạy ứng dụng
    host: "localhost", // Cho phép truy cập nội bộ
  },
});
