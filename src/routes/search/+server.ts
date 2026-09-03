import { json } from '@sveltejs/kit';

import {
	normalizeStockX,
	normalizeGoat,
	hasGoatSize,
	hasStockXSize,
	isAdultGoatProduct,
	mergeSneakers
} from '$lib/kickFormatters.js';

import { searchStockXProducts, searchGoatProducts } from '$lib/server/kicks.js';

export async function GET({ url }) {
	const query = url.searchParams.get('q')?.trim();
	const size = Number(url.searchParams.get('size')) || 10;

	if (!query) {
		return json([]);
	}

	const [stockxResponse, goatResponse] = await Promise.all([
		searchStockXProducts(query),
		searchGoatProducts(query)
	]);

	const stockx = stockxResponse.collections
		.filter((product: any) => hasStockXSize(product, size))
		.map((product: any) => normalizeStockX(product, size));

	const goat = goatResponse.collections
		.filter(isAdultGoatProduct)
		.filter((product: any) => hasGoatSize(product, size))
		.map((product: any) => normalizeGoat(product, size));

	const products = mergeSneakers(stockx, goat);

	return json(products);
}
