import { fileURLToPath } from "node:url";
import { defineConfig } from "waku/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  middleware: [
    "waku/middleware/context",
    "waku/middleware/dev-server",
    "./src/middleware/auth.ts",
    "waku/middleware/handler",
  ],
  unstable_viteConfigs: {
    common: () => ({
      plugins: [
        tsconfigPaths({ root: fileURLToPath(new URL(".", import.meta.url)) }),
      ],
      environments: {
        ssr: {
          optimizeDeps: {
            include: [
              "@radix-ui/react-dialog",
              "@radix-ui/react-dropdown-menu",
              "@radix-ui/react-label",
              "@radix-ui/react-separator",
              "@radix-ui/react-slot",
              "@radix-ui/react-tooltip"
            ],
          },
        },
      },
    }),
  },
  vite: {
    plugins: [tsconfigPaths()],
  },
});
