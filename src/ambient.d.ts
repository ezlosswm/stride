import type { number } from 'zod';
import type { ButtonVariant } from './components/ui/button';

declare global {
	type NavLinks = {
		title: string;
		href: string;
		variant: ButtonVariant;
	};

	type Marketplace = {
		marketplace: 'stockx' | 'goat';
		productId: string;
		price: number | null;
	};

	type Sneaker = {
		sku: string;
		name: string;
		brand: string;
		isFavorite: boolean;
		imageUrl?: string;
		colorway?: string;

		markets: Marketplace[];
	};

	type SortType = {
		value: string;
		label: string;
	};

	type FilterType = {
		label: string;
		isActive: boolean;
	};

	type ShoeSize = {
		menSize: number;
		womenSize: number;
	};
}

export {};
