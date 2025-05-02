import request from "supertest";
import { expect, afterAll, beforeAll, beforeEach, describe, it } from "vitest";
import { app } from "../../server";
import { prisma } from "../../../database/prisma/prisma";
import { hash } from "bcrypt";

describe("Get Profile (e2e)", () => {
	beforeAll(async () => {
		await app.ready();
	});

	beforeEach(async () => {
		await prisma.$executeRaw`TRUNCATE TABLE users`;
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to get user profile", async () => {
		const user = await prisma.user.create({
			data: {
				name: "Acme",
				email: "acme@gmail.com",
				phone: "86988889999",
				document: "11111111111",
				password: await hash("00000000", 6),
			},
		});

		const accessToken = app.jwt.sign({ sub: user.id.toString() });

		const response = await request(app.server)
			.get("/users/profile")
			.set("Authorization", `Bearer ${accessToken}`);

		expect(response.statusCode).toEqual(200);
		expect(response.body).toEqual({
			success: true,
			errors: null,
			data: {
				id: expect.any(String),
				name: "Acme",
				email: "acme@gmail.com",
				role: "MEMBER",
			},
		});
	});

	it("should not be able to get profile without token", async () => {
		const response = await request(app.server).get("/users/profile");

		expect(response.statusCode).toEqual(401);
	});

	it("should not be able to get profile with invalid user id", async () => {
		const accessToken = app.jwt.sign({ sub: "invalid-user-id" });

		const response = await request(app.server)
			.get("/users/profile")
			.set("Authorization", `Bearer ${accessToken}`);

		expect(response.statusCode).toEqual(404);
		expect(response.body).toEqual({
			success: false,
			errors: ["Usuário não encontrado"],
			data: null,
		});
	});
});
