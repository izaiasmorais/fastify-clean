import { Prisma, User as PrismaUser } from "@prisma/client";
import { User } from "../../../../domain/entities/user";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";

export class PrismaUserMapper {
	static toDomain(raw: PrismaUser): User {
		return User.create(
			{
				email: raw.email,
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
			email: user.email,
			password: user.password,
			name: user.name,
			phone: user.phone,
			role: user.role.toPrisma(),
		};
	}
}
