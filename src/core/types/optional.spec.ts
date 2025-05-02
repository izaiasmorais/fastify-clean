import { Optional } from "./optional";
import { test, expect } from "vitest";

type User = {
	id: string;
	name: string;
	email: string;
	age: number;
};

type OptionalUser = Optional<User, "id" | "email">;

function createUser(user: OptionalUser): User {
	return {
		id: user.id ?? "default-id",
		name: user.name,
		email: user.email ?? "default@email.com",
		age: user.age,
	};
}

test("should accept object with all required fields", () => {
	const user: OptionalUser = {
		name: "John Doe",
		age: 30,
	};

	const result = createUser(user);

	expect(result).toEqual({
		id: "default-id",
		name: "John Doe",
		email: "default@email.com",
		age: 30,
	});
});

test("should accept object with optional fields provided", () => {
	const user: OptionalUser = {
		id: "custom-id",
		name: "John Doe",
		email: "john@email.com",
		age: 30,
	};

	const result = createUser(user);

	expect(result).toEqual({
		id: "custom-id",
		name: "John Doe",
		email: "john@email.com",
		age: 30,
	});
});
