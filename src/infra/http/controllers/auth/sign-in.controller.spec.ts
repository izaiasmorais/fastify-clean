import request from "supertest";
import { afterAll, beforeAll, beforeEach, describe, it, expect } from "vitest";
import { app } from "../../server";
import { prisma } from "../../../database/prisma/prisma";
import { hash } from "bcrypt";

describe("Sign In (e2e)", () => {
	beforeAll(async () => {
		await app.ready();
	});

	beforeEach(async () => {
		await prisma.$executeRaw`TRUNCATE TABLE users`;
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to sign in", async () => {
		await prisma.user.create({
			data: {
				name: "Acme",
				email: "acme@gmail.com",
				password: await hash("00000000", 6),
				phone: "86988889999",
				document: "11111111111",
			},
		});

		const response = await request(app.server).post("/auth/sign-in").send({
			email: "acme@gmail.com",
			password: "00000000",
		});

		expect(response.statusCode).toEqual(200);
		expect(response.body).toEqual(
			expect.objectContaining({
				success: true,
				errors: null,
				data: expect.any(Object),
			})
		);
	});

	it("should not be able to sign in with an invalid email", async () => {
		const response = await request(app.server).post("/auth/sign-in").send({
			email: "acme@gmail.com",
			password: "00000000",
		});

		expect(response.statusCode).toEqual(400);
		expect(response.body).toEqual({
			success: false,
			errors: ["Credenciais inválidas"],
			data: null,
		});
	});
});
