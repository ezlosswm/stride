import { fail, message, superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { regitrationFormSchema } from '$lib/schemas/registration';
import { zod4 } from 'sveltekit-superforms/adapters';
import { redirect, type Actions } from '@sveltejs/kit';
import { AuthService } from '$lib/services/AuthService';
import { createAuthService } from '$lib/server/auth';
import { goto } from '$app/navigation';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod4(regitrationFormSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod4(regitrationFormSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { firstName, lastName, email, password } = form.data;

		const authService = createAuthService(event.locals.supabase);

		const result = await authService.register({
			firstName,
			lastName,
			email,
			password
		});

		if (!result.ok) {
			console.error('Registration failed:', result.reason);

			const status =
				result.reason === 'USER_ALREADY_EXISTS'
					? 409
					: result.reason === 'RATE_LIMITED'
						? 429
						: result.reason === 'WEAK_PASSWORD'
							? 400
							: 500;

			return message(form, result.message, { status });
		}

		redirect(303, '/');
	}
};
