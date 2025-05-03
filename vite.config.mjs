import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [tsconfigPaths()],
	test: {
		environmentMatchGlobs: [["src/infra/http/controllers/**", "prisma"]],
		exclude: ["**/node_modules/**", "**/dist/**", "**/prisma/**"],
	},
});
