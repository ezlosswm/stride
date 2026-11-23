import { AuthService } from '$lib/services/AuthService';
import { UserReposity } from '$lib/repository/UserRepository';
import type { SupabaseClient } from '@supabase/supabase-js';

export function createAuthService(supabase: SupabaseClient) {
	const userRepository = new UserReposity(supabase);
	return new AuthService(userRepository);
}
