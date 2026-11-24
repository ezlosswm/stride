import z from 'zod/v4';

export const regitrationFormSchema = z
	.object({
		firstName: z.string().min(1, 'First name is required.'),
		lastName: z.string().min(1, 'Last name is required.'),
		email: z.email('Invalid email address.'),
		password: z.string().min(8, 'Password must be at least 8 characters.').max(50),
		confirmPassword: z.string().min(8).max(50)
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match.',
		path: ['confirmPassword']
	});

export type RegistrationFormSchema = typeof regitrationFormSchema;
