// place files you want to import through the `$lib` alias in this folder.
export function formatPrice(price: number | undefined): string {
	return `$${price?.toFixed(2)}`;
}

// Test function to simulate favoriting a shoe
export function testLikeButton(shoeId: string): void {
	console.log(`Like button clicked for shoe ID: ${shoeId}`);
}

export function normalizeSKU(value: string) {
	return value.trim().toUpperCase().replace(/\s+/g, '-');
}

export function normalizeStockX(product: any): Sneaker {
	return {
		sku: normalizeSKU(product.sku),

		name: product.title,
		brand: product.brand,
		colorway: product.colorway,
		imageUrl: product.image,
		isFavorite: false,

		markets: [
			{
				marketplace: 'stockx',
				productId: product.id,
				price: product.min_price
			}
		]
	};
}
export function normalizeGoat(product: any): Sneaker {
	return {
		sku: normalizeSKU(product.sku),

		name: product.name,
		brand: product.brand,
		colorway: product.colorway,
		imageUrl: product.image_url,
		isFavorite: false,

		markets: [
			{
				marketplace: 'goat',
				productId: product.id,
				price: product.min_price
			}
		]
	};
}

export function mergeSneakers(stockxProducts: Sneaker[], goatProducts: Sneaker[]): Sneaker[] {
	const products = new Map<string, Sneaker>();

	for (const product of stockxProducts) {
		products.set(product.sku, product);
	}

	for (const product of goatProducts) {
		const existing = products.get(product.sku);

		if (existing) {
			existing.markets.push(...product.markets);

			existing.imageUrl ||= product.imageUrl;
			existing.colorway ||= product.colorway;
		} else {
			products.set(product.sku, product);
		}
	}

	return Array.from(products.values());
}
