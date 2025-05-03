import { FastifyReply } from "fastify";
import { env } from "../env/env";
import { Encrypter } from "../../domain/cryptography/encypter";

export class JwtEncrypter implements Encrypter {
	constructor(private reply: FastifyReply) {}

	async encrypt(payload: Record<string, unknown>): Promise<string> {
		const token = await this.reply.jwtSign(
			{
				role: payload.role,
				sub: payload.sub,
			},
			{
				sign: {
					expiresIn: env.EXPIRES_IN,
				},
			}
		);

		return token;
	}
}
