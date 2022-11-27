import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import monacoEditorPlugins from "vite-plugin-monaco-editor";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";

export default defineConfig({
  // @ts-ignore
  plugins: [
    vue(),
    monacoEditorPlugins.default({}),
    AutoImport({
      imports: [
        "vue",
        {
          "naive-ui": [
            "useDialog",
            "useMessage",
            "useNotification",
            "useLoadingBar",
          ],
        },
      ],
    }),
    Components({
      resolvers: [NaiveUiResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
