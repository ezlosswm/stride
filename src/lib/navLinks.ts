import type { ButtonVariant } from './components/ui/button';

type NavLinks = {
	title: string;
	href: string;
	variant: ButtonVariant;
};

export const navLinks: NavLinks[] = [
	{
		title: 'About',
		href: '/about',
		variant: 'ghost'
	},
	{
		title: 'News',
		href: '/news',
		variant: 'ghost'
	},
	{
		title: 'Login or Register',
		href: '/auth/register',
		variant: 'default'
	}
];
