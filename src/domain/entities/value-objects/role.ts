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

	public static admin(): Role {
		return new Role(DomainRole.ADMIN);
	}

	public static member(): Role {
		return new Role(DomainRole.MEMBER);
	}

	public toString(): string {
		return this.value;
	}
}
