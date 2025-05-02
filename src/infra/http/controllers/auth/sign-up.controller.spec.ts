import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../server";

describe("Register (e2e)", () => {
	beforeAll(async () => {
		await app.ready();
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
	});
});
