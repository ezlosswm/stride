import z from 'zod/v4';

export const onboardingFormSchema = z.object({
	sizeCategory: z.enum(['men', 'women', 'unisex'], 'Please select a sizing category.'),
	shoeSize: z.enum(
		['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13'],
		'Please select your shoe size.'
	)
});

export type OnboardingFormSchema = typeof onboardingFormSchema;
