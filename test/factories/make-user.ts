import { User, UserProps } from "../../src/domain/entities/user";

export function makeUser(override: Partial<UserProps> = {}) {
	const user = User.create({
		name: "John Doe",
		email: "john@doe.com",
		phone: "86911110000",
		document: "11122233344",
		password: "12345678",
		...override,
	});

	return user;
}
