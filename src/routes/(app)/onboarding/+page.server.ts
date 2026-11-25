import { onboardingFormSchema } from '$lib/schemas/onboarding';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';
import type { Actions } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod4(onboardingFormSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod4(onboardingFormSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { sizeCategory, shoeSize } = form.data;

		console.log('Category: ', sizeCategory);
		console.log('Size: ', shoeSize);
	}
};
