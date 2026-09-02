import { json } from '@sveltejs/kit';

import {
	normalizeStockX,
	normalizeGoat,
	hasGoatSize,
	hasStockXSize,
	isAdultGoatProduct,
	mergeSneakers
} from '$lib/kickFormatters.js';
import { getStockXProducts, getGoatProducts } from '$lib/server/kicks.js';

export async function GET(event) {
	const sizeParam = event.url.searchParams.get('size');
	const size = Number(sizeParam) || 10; // Default size if not provided

	const [stockxResponse, goatResponse] = await Promise.all([
		getStockXProducts(),
		getGoatProducts()
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
