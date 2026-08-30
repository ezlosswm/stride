import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ url, locals: { getUser, supabase } }) => {
	// const user = await getUser();
	// if (user) {
	// 	console.log('No user, redirecting to login');
	// 	throw redirect(303, '/');
	// }
	// const {
	// 	data: { session }
	// } = await supabase.auth.getSession();
	// if (!session) {
	// 	console.log('❌ No session, redirecting to login');
	// 	throw redirect(303, `/auth/register`);
	// }
	// return {
	// 	session,
	// 	user
	// };
};
