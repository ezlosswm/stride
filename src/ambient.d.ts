declare global {
	type Marketplace = {
		marketplace: 'stockx' | 'goat';
		productId: string;
		price: number | null;
		url?: string;
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
}

export {};
