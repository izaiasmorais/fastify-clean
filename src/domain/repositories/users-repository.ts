import { User } from "../entities/user";

export interface UsersRepository {
	findByEmail(email: string): Promise<User | null>;
	findByDocument(document: string): Promise<User | null>;
	findById(id: string): Promise<User | null>;
	findByPhone(phone: string): Promise<User | null>;
	findMany(): Promise<User[]>;
	create(user: User): Promise<void>;
	edit(user: User): Promise<void>;
	delete(user: User): Promise<void>;
}
