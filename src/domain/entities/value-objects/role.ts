import { Role as PrismaRole } from "@prisma/client";

export enum DomainRole {
	ADMIN = "ADMIN",
	MEMBER = "MEMBER",
}

export class Role {
	private readonly value: DomainRole;

	private constructor(role: DomainRole) {
		this.value = role;
	}

	public getValue(): DomainRole {
		return this.value;
	}

	public toPrisma(): PrismaRole {
		switch (this.value) {
			case DomainRole.ADMIN:
				return PrismaRole.ADMIN;
			case DomainRole.MEMBER:
				return PrismaRole.MEMBER;
			default:
				throw new Error(`Invalid role: ${this.value}`);
		}
	}

	public static fromPrisma(role: PrismaRole): Role {
		switch (role) {
			case PrismaRole.ADMIN:
				return Role.admin();
			case PrismaRole.MEMBER:
				return Role.member();
			default:
				throw new Error(`Invalid Prisma role: ${role}`);
		}
	}

	public static create(role: DomainRole): Role {
		return new Role(role);
	}

	public static admin(): Role {
		return new Role(DomainRole.ADMIN);
	}

	public static member(): Role {
		return new Role(DomainRole.MEMBER);
	}

	public equals(role: Role): boolean {
		return this.value === role.value;
	}

	public toString(): string {
		return this.value;
	}
}
