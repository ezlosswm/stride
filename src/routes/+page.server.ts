import { normalizeStockX, normalizeGoat, mergeSneakers } from '$lib/index.js';
import { getStockXProducts, getGoatProducts } from '$lib/server/kicks.js';

// NOTE: Make sure to set user preferences for shoe size
export const load = async ({}) => {
	const [stockxResponse, goatResponse] = await Promise.all([
		getStockXProducts(),
		getGoatProducts()
	]);

	const stockx = stockxResponse.collections.map(normalizeStockX);
	const goat = goatResponse.collections.map(normalizeGoat);

	const products = mergeSneakers(stockx, goat);

	console.log('List of products\n', products);

	return {
		collections: products
	};
};
