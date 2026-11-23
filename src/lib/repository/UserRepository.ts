import type { RegisterUserProps } from '$lib/domain/RegisterUser';
import type { SupabaseClient, User } from '@supabase/supabase-js';

export type RegisterResult =
	| {
			ok: true;
			user: User;
	  }
	| {
			ok: false;
			reason: 'USER_ALREADY_EXISTS' | 'WEAK_PASSWORD' | 'AUTH_ERROR' | 'RATE_LIMITED';
			message: string;
	  };

export class UserReposity {
	constructor(private supabase: SupabaseClient) {}

	async save(user: RegisterUserProps) {
		try {
			const { data, error } = await this.supabase.auth.signUp({
				email: user.email,
				password: user.password,
				options: {
					data: {
						first_name: user.firstName,
						last_name: user.lastName
					}
				}
			});

			if (error) {
				console.error('Supabase Auth Error:', error);

				switch (error.code) {
					case 'email_exists':
					case 'user_already_exists':
						return {
							ok: false,
							reason: 'USER_ALREADY_EXISTS',
							message: 'An account with this email already exists.'
						};

					case 'weak_password':
						return {
							ok: false,
							reason: 'WEAK_PASSWORD',
							message: 'Your password does not meet the security requirements.'
						};

					case 'over_email_send_rate_limit':
						return {
							ok: false,
							reason: 'RATE_LIMITED',
							message:
								'Too many registration attempts. Please wait a few minutes before trying again.'
						};

					default:
						return {
							ok: false,
							reason: 'AUTH_ERROR',
							message: 'Something went wrong while creating your account. Please try again.'
						};
				}
			}
			// when email confirmation is enabled, an existing user returns with no identities
			// TODO: Add implementation for email confirmation

			if (!data.user) {
				return {
					ok: false,
					reason: 'AUTH_ERROR',
					message: 'Supabase did not return a registered user.'
				};
			}

			return {
				ok: true,
				user: data.user
			};
		} catch (err) {
			console.error('Supabase registration error: ', err);

			return {
				ok: false,
				reason: 'AUTH_ERROR',
				message: 'An unexpected error occured.'
			};
		}
	}
}
