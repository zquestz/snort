import react from "@vitejs/plugin-react";
import appConfig from "config";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import { vitePluginVersionMark } from "vite-plugin-version-mark";

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@welldone-software/why-did-you-render",
    }),
    VitePWA({
      strategies: "injectManifest",
      injectRegister: "inline",
      srcDir: "src",
      filename: "service-worker.ts",
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
        type: "module",
      },
    }),
    visualizer({
      open: true,
      gzipSize: true,
      filename: "build/stats.html",
    }),
    vitePluginVersionMark({
      name: "snort",
      ifGitSHA: true,
      command: "git describe --always --tags",
      ifMeta: false,
      ifLog: false,
    }),
  ],
  assetsInclude: ["**/*.md", "**/*.wasm"],
  build: {
    outDir: "build",
    commonjsOptions: { transformMixedEsModules: true },
    sourcemap: true,
    rollupOptions: {
      external: ["eventemitter3"],
    }
  },
  clearScreen: false,
  publicDir: appConfig.get("publicDir"),
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  define: {
    CONFIG: JSON.stringify(appConfig),
    global: {}, // needed for custom-event lib
  },
  worker: {
    format: "es",
  },
});
