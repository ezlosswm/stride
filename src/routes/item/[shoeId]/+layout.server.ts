import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
	const user = await locals.getUser();
	if (!user) {
		console.log('No user, redirecting to login');
		throw redirect(303, `/auth/register?redirectTo=${url.pathname}`);
	}

	const {
		data: { session }
	} = await locals.supabase.auth.getSession();

	if (!session) {
		console.log('❌ No session, redirecting to login');
		throw redirect(303, `/auth/register`);
	}

	return {
		session,
		user
	};
};
