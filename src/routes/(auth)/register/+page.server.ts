import { fail, superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { regitrationFormSchema } from '$lib/schemas/registration';
import { zod4 } from 'sveltekit-superforms/adapters';
import type { Actions } from '@sveltejs/kit';

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

		const { firstName, lastName, email, password, confirmPassword } = form.data;

		console.log('First Name', firstName);
		console.log('Last Name', lastName);
		console.log('Email', email);
		console.log('Password', password);
		console.log('Confirmation', confirmPassword);
	}
};
