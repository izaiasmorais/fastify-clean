import swc from "unplugin-swc";
import { defineConfig } from "vitest/config";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	test: {
		globals: true,
		root: "./",
		workspace: [
			{
				extends: true,
				test: {
					environment: "prisma",
				},
			},
		],
	},
	plugins: [
		tsConfigPaths(),
		swc.vite({
			module: { type: "es6" },
		}),
	],
});
