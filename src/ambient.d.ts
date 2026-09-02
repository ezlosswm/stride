import type { number } from 'zod';
import type { ButtonVariant } from './components/ui/button';

declare global {
	type NavLinks = {
		title: string;
		href: string;
		variant: ButtonVariant;
	};

	type Marketplace = {
		marketplace: 'StockX' | 'GOAT';
		productId: string;
		price: number | null;
		url: string;
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

	// type Filters = {
	// 	currency: string,
	// 	market: string,
	// 	filters: string,
	// 	displayPrices: boolean,
	// 	displayVariants: boolean,
	// 	limit: number
	// }

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
		value: string;
	};
}

export {};
