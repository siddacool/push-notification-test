import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/push-notification-test/",
  assetsDir: "assets",
  plugins: [reactRefresh()],
});
