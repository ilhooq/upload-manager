import { defineConfig } from "vite"
import { svelte } from "@sveltejs/vite-plugin-svelte"
import { resolve } from "node:path"

export default defineConfig({
  plugins: [
    svelte({
      compilerOptions: {
        customElement: true
      }
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.js"),
      name: "UploaderWidget",
      formats: ["es", "umd"],
      fileName: (format) => `uploader-widget.${format}.js`
    },
    cssCodeSplit: false,
    sourcemap: true
  },
  server: {
    proxy: {
      '/example/app.php': 'http://localhost:8081/example/app.php'
    }
  }
})
