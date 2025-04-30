import { Prisma, User as PrismaUser } from "@prisma/client";
import { User } from "../../../../domain/entities/user";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { Email } from "../../../../domain/entities/value-objects/email";

export class PrismaUserMapper {
	static toDomain(raw: PrismaUser): User {
		return User.create(
			{
				email: Email.create(raw.email),
				password: raw.password,
				name: raw.name,
				document: raw.document,
				phone: raw.phone,
				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt,
			},
			new UniqueEntityID(raw.id)
		);
	}

	static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
		return {
			id: user.id.toString(),
			document: user.document,
			email: user.email.toString(),
			password: user.password,
			name: user.name,
			phone: user.phone,
			role: user.role.toPrisma(),
		};
	}
}
