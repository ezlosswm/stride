import { productList } from '$lib/sampleData';
import { normalizeStockX, normalizeGoat, mergeSneakers } from '$lib/index.js';
import { getStockXProducts, getGoatProducts } from '$lib/server/kicks.js';

// NOTE: Make sure to set user preferences for shoe size
// export const load = async ({}) => {
// 	const [stockxResponse, goatResponse] = await Promise.all([
// 		getStockXProducts(),
// 		getGoatProducts()
// 	]);

// 	const stockx = stockxResponse.collections.map(normalizeStockX);
// 	const goat = goatResponse.collections.map(normalizeGoat);

// 	const products = mergeSneakers(stockx, goat);

// 	for (const product of products) {
// 		console.log(product.markets);
// 	}

// 	return {
// 		collections: products
// 	};
// };

export const load = async () => {
	let products = productList;
	return {
		collections: products
	};
};
