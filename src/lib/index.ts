// place files you want to import through the `$lib` alias in this folder.
export function appendUniqueProducts(current: Sneaker[], incoming: Sneaker[]): Sneaker[] {
	const products = new Map<string, Sneaker>();

	for (const product of current) {
		products.set(product.sku, product);
	}

	for (const product of incoming) {
		if (!products.has(product.sku)) {
			products.set(product.sku, product);
		}
	}

	return Array.from(products.values());
}

export function debounce(callback: any, delay = 600) {
	let timeoutId: ReturnType<typeof setTimeout> | undefined;

	return function (this: any, ...args: any[]) {
		if (timeoutId !== undefined) {
			clearTimeout(timeoutId);
		}

		timeoutId = setTimeout(() => {
			callback.apply(this, args);
		}, delay);
	};
}

export function getLowestPrice(collection: Sneaker): number | null {
	const prices = collection.markets
		.map((market) => market.price)
		.filter((price): price is number => price !== null);

	return prices.length ? Math.min(...prices) : null;
}
