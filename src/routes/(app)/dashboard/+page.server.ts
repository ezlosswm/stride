import { UserProfile } from '$lib/domain/UserProfile';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const sampleProfile = new UserProfile('testId', 'userId', 'Male', '10');

	return {
		sampleProfile: { ...sampleProfile }
	};
};
