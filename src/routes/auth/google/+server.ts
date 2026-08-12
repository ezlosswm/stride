import { redirect } from '@sveltejs/kit';

export const GET = async ({ locals: { supabase }, url }) => {
	const { data } = await supabase.auth.signInWithOAuth({
		provider: 'google',
		options: {
			queryParams: {
				access_type: 'offline',
				prompt: 'consent'
			},
			redirectTo: url.origin + '/auth/callback'
		}
	});

	// If Supabase returned the Google redirect URL, redirect the user there
	if (data?.url) {
		throw redirect(307, data.url);
	}

	// Fallback if something failed
	throw redirect(307, '/auth/error');
};
