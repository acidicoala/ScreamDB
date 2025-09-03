import { defineConfig } from "vite";
import devtoolsJson from "vite-plugin-devtools-json";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),

    // See https://github.com/remix-run/react-router/issues/13516#issuecomment-2866533925
    devtoolsJson(),

    // Needed to support aliased imports (~/)
    tsconfigPaths(),

    // To us SVGs are React components
    svgr(),
  ],
});
