import { defineConfig, mergeConfig } from "vitest/config";
import vitestConfig from "./vitest.config.mjs";

export default mergeConfig(
	vitestConfig,
	defineConfig({
		test: {
			include: [
				"**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
				"**/*.e2e-{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
			],
		},
	})
);
