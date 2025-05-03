import z from "zod";

import "dotenv/config";

const envSchema = z.object({
	DATABASE_URL: z.string().url(),
	PORT: z.coerce.number().optional().default(3333),
	NODE_ENV: z
		.enum(["development", "production", "test"])
		.default("development")
		.optional(),
	JWT_SECRET: z.string(),
	EXPIRES_IN: z.coerce
		.number()
		.default(60 * 60)
		.optional(), // 1 hour
});

export const env = envSchema.parse(process.env);
