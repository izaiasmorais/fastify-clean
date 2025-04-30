import { CustomError } from "../../core/errors/custom-error";
import { Either, left, right } from "../../core/types/either";
import { Email } from "../entities/value-objects/email";
import { Role } from "../entities/value-objects/role";
import { UsersRepository } from "../repositories/users-repository";

type GetProfileUseCaseRequest = {
	userId: string;
};

type GetProfileUseCaseResponse = Either<
	CustomError,
	{
		user: {
			id: string;
			name: string;
			email: Email;
			role: Role;
		};
	}
>;

export class GetProfileUseCase {
	constructor(private UsersRepository: UsersRepository) {}

	async execute({
		userId,
	}: GetProfileUseCaseRequest): Promise<GetProfileUseCaseResponse> {
		const user = await this.UsersRepository.findById(userId);

		if (!user) {
			return left(new CustomError(404, "Usuário não encontrado"));
		}

		return right({
			user: {
				id: user.id.toString(),
				name: user.name,
				email: user.email,
				role: user.role,
			},
		});
	}
}
