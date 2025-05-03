import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { makeGetProfileUseCase } from "../../../database/prisma/use-cases/make-get-profile-use-case";
import { errorResponseSchema, successResponseSchema } from "../../schemas/http";
import { verifyJwt } from "../../middleware/auth";
import { getProfileResponseSchema } from "../../schemas/auth";
import { verifyUserRole } from "../../middleware/verify-user-role";

export async function getProfile(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get(
		"/users/profile",
		{
			onRequest: [verifyJwt, verifyUserRole("MEMBER")],
			schema: {
				tags: ["Users"],
				operationId: "getProfile",
				summary: "Get user profile",
				security: [{ bearerAuth: [] }],
				response: {
					200: successResponseSchema(getProfileResponseSchema).describe(
						"Success"
					),
					404: errorResponseSchema.describe("Not Found"),
				},
			},
		},
		async (request, reply) => {
			const userId = request.user.sub;

			const getProfileUseCase = makeGetProfileUseCase();

			const response = await getProfileUseCase.execute({
				userId,
			});

			if (response.isLeft()) {
				return reply.status(response.value.statusCode).send({
					success: false,
					errors: response.value.errors,
					data: null,
				});
			}

			return reply.status(200).send({
				success: true,
				errors: null,
				data: {
					...response.value.user,
					email: response.value.user.email.toString(),
					role: response.value.user.role.getValue(),
				},
			});
		}
	);
}
