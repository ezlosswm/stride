const defaultShoeSize = 10;

export function formatPrice(price: number | null): string {
	if (price === null) return 'Unavailable';

	return `$${price.toFixed(2)}`;
}

// Test function to simulate favoriting a shoe
export function testLikeButton(shoeId: string): void {
	console.log(`Like button clicked for shoe ID: ${shoeId}`);
}

export function normalizeSKU(value: string) {
	return value.trim().toUpperCase().replace(/\s+/g, '-');
}

export function hasStockXSize(product: any, size: number) {
	return product.variants?.some(
		(variant: any) =>
			Number(variant.size) === size &&
			variant.hidden !== true &&
			variant.total_asks > 0 &&
			variant.lowest_ask > 0
	);
}

function getStockXPriceForSize(
	variants: {
		size: string;
		lowest_ask: number;
		hidden: boolean;
	}[],
	size: number
) {
	const variant = variants.find((v) => Number(v.size) === size && !v.hidden && v.lowest_ask > 0);

	return variant?.lowest_ask ?? null;
}

export function normalizeStockX(product: any, size: number = defaultShoeSize): Sneaker {
	const price = getStockXPriceForSize(product.variants, size);

	return {
		sku: normalizeSKU(product.sku),

		name: product.title,
		brand: product.brand,
		colorway: product.colorway,
		imageUrl: product.image,
		isFavorite: false,

		markets: [
			{
				marketplace: 'StockX',
				productId: product.sku,
				price,
				url: product.link
			}
		]
	};
}

export function isAdultGoatProduct(product: any) {
	const text = `${product.name} ${product.nickname ?? ''}`.toLowerCase();

	return !(
		text.includes(' gs ') ||
		text.endsWith(' gs') ||
		text.includes('grade school') ||
		text.includes(' ps ') ||
		text.endsWith(' ps') ||
		text.includes('preschool') ||
		text.includes(' td ') ||
		text.endsWith(' td') ||
		text.includes('toddler')
	);
}

export function hasGoatSize(product: any, size: number) {
	return product.variants?.some(
		(variant: any) =>
			Number(variant.size) === size && variant.available === true && variant.lowest_ask > 0
	);
}

function getGoatPriceForSize(
	variants: { size: string; lowest_ask: number; available: boolean }[],
	size: number
) {
	const variant = variants.find((v) => Number(v.size) === size && v.available && v.lowest_ask > 0);

	return variant?.lowest_ask ?? null;
}

export function normalizeGoat(product: any, size: number = defaultShoeSize): Sneaker {
	const price = getGoatPriceForSize(product.variants, size);

	return {
		sku: normalizeSKU(product.sku),

		name: product.name,
		brand: product.brand,
		colorway: product.colorway,
		imageUrl: product.image_url,
		isFavorite: false,

		markets: [
			{
				marketplace: 'GOAT',
				productId: product.sku,
				price,
				url: product.link
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

export function compareMarkets(collection: any) {
	let lowerMarket: Marketplace = collection.markets[0];
	let priceDifference: number = 0;

	if (collection.markets.length >= 2) {
		const otherMarket = collection.markets.find(
			(market: any) => market.marketplace !== lowerMarket.marketplace
		);

		if (otherMarket) {
			priceDifference = Number(otherMarket.price) - lowerMarket.price!;
		}
	}

	return {
		lowerMarket,
		priceDifference
	};
}
