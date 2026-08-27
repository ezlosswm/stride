import type { ButtonVariant } from './components/ui/button';

type NavLinks = {
	title: string;
	href: string;
	variant: ButtonVariant;
};

export const navLinks: NavLinks[] = [
	{
		title: 'Explore sneakers',
		href: '/#collections',
		variant: 'ghost'
	},
	{
		title: 'Saved picks',
		href: '/saved-picks',
		variant: 'ghost'
	},
	{
		title: 'How it works',
		href: '/#how-it-works',
		variant: 'ghost'
	}
];
