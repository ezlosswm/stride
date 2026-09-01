import {
	normalizeStockX,
	normalizeGoat,
	isAdultGoatProduct,
	mergeSneakers
} from '$lib/kickFormatters.js';
import { getStockXProducts, getGoatProducts } from '$lib/server/kicks.js';

// NOTE: Make sure to set user preferences for shoe size
export const load = async ({}) => {
	const [stockxResponse, goatResponse] = await Promise.all([
		getStockXProducts(),
		getGoatProducts()
	]);

	const stockx = stockxResponse.collections.map(normalizeStockX);
	const goat = goatResponse.collections.filter(isAdultGoatProduct).map(normalizeGoat);

	const products = mergeSneakers(stockx, goat);

	return {
		collections: products
	};
};

// export const load = async () => {
// 	let products = productList;
// 	return {
// 		collections: products
// 	};
// };
