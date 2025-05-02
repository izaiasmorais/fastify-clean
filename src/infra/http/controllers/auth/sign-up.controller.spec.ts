import request from "supertest";
import { describe, expect, it, beforeEach, beforeAll, afterAll } from "vitest";
import { app } from "../../server";
import { prisma } from "../../../database/prisma/prisma";
import { hash } from "bcrypt";

describe("Register (e2e)", () => {
	beforeAll(async () => {
		await app.ready();
	});

	beforeEach(async () => {
		await prisma.$executeRaw`TRUNCATE TABLE users`;
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to register", async () => {
		const response = await request(app.server).post("/auth/sign-up").send({
			name: "Acme",
			email: "acme@gmail.com",
			phone: "86988889999",
			document: "11111111111",
			password: "00000000",
		});

		expect(response.statusCode).toEqual(201);

		const isUserCreated = await prisma.user.findUnique({
			where: {
				email: "acme@gmail.com",
			},
		});

		expect(isUserCreated).toBeTruthy();
	});

	it("should not be able to register with an existing email", async () => {
		await prisma.user.create({
			data: {
				name: "Acme",
				email: "acme@gmail.com",
				password: await hash("00000000", 6),
				phone: "86988889999",
				document: "11111111111",
			},
		});

		const response = await request(app.server).post("/auth/sign-up").send({
			name: "Acme",
			email: "acme@gmail.com",
			phone: "86988889999",
			document: "11111111111",
			password: "00000000",
		});

		expect(response.statusCode).toEqual(409);
	});
});
