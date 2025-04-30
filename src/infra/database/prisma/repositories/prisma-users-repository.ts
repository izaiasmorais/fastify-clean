import { UsersRepository } from "../../../../domain/repositories/users-repository";
import { prisma } from "../prisma";
import { User } from "../../../../domain/entities/user";
import { PrismaUserMapper } from "../mappers/prisma-user-mapper";

export class PrismaUsersRepository implements UsersRepository {
	async findById(id: string): Promise<User | null> {
		const user = await prisma.user.findUnique({
			where: {
				id,
			},
		});

		if (!user) {
			return null;
		}

		return PrismaUserMapper.toDomain(user);
	}

	async findByPhone(phone: string): Promise<User | null> {
		const user = await prisma.user.findFirst({
			where: {
				phone,
			},
		});

		if (!user) {
			return null;
		}

		return PrismaUserMapper.toDomain(user);
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (!user) {
			return null;
		}

		return PrismaUserMapper.toDomain(user);
	}

	async findByDocument(document: string): Promise<User | null> {
		const user = await prisma.user.findUnique({
			where: {
				document,
			},
		});

		if (!user) {
			return null;
		}

		return PrismaUserMapper.toDomain(user);
	}

	async findMany(): Promise<User[]> {
		const users = await prisma.user.findMany();

		return users.map(PrismaUserMapper.toDomain);
	}

	async create(user: User): Promise<void> {
		const data = PrismaUserMapper.toPrisma(user);

		await prisma.user.create({
			data,
		});
	}

	async edit(user: User): Promise<void> {
		const data = PrismaUserMapper.toPrisma(user);

		await prisma.user.update({
			where: {
				id: user.id.toString(),
			},
			data,
		});
	}

	async delete(user: User): Promise<void> {
		const data = PrismaUserMapper.toPrisma(user);

		await prisma.user.delete({
			where: {
				id: data.id,
			},
		});
	}
}
