import { RegisterUserProps } from '$lib/domain/RegisterUser';
import { UserReposity } from '$lib/repository/UserRepository';
import { error } from '@sveltejs/kit';

export class AuthService {
	constructor(private userRepository: UserReposity) {}

	async register(registerUserProps: RegisterUserProps) {
		console.log('Registration in progress');

		const result = await this.userRepository.save(registerUserProps);
		if (!result.ok) {
			return result;
		}

		return {
			ok: true as const,
			user: result.user
		};
	}
}
