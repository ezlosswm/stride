import { KICKS_API_KEY } from '$env/static/private';

export const getStockXProduct = async (sku: string) => {
	const params = new URLSearchParams({
		currency: 'USD',
		market: 'US',
		filters: `product_type = "sneakers" AND gender = "men" AND sku = "${sku}"`,
		'display[prices]': 'true',
		'display[variants]': 'true',
		limit: '1'
	});
	const res = await fetch(`https://api.kicks.dev/v3/stockx/products?${params.toString()}`, {
		headers: { Authorization: `${KICKS_API_KEY}` }
	});

	if (!res.ok) {
		console.error('GOAT error: ', res.status, await res.text());

		return {
			collections: []
		};
	}

	const stockXData = await res.json();

	return {
		collections: stockXData.data ?? []
	};
};

export const getStockXProducts = async () => {
	const params = new URLSearchParams({
		currency: 'USD',
		market: 'US',
		filters: 'product_type = "sneakers" AND gender = "men"',
		'display[prices]': 'true',
		'display[variants]': 'true',
		limit: '20'
	});
	const res = await fetch(`https://api.kicks.dev/v3/stockx/products?${params.toString()}`, {
		headers: { Authorization: `${KICKS_API_KEY}` }
	});

	const stockXData = await res.json();

	return {
		collections: stockXData.data
	};
};

export const getGoatProduct = async (sku: string) => {
	const params = new URLSearchParams({
		currency: 'USD',
		filters: `category = "shoes" sku = '${sku}'`,
		'display[prices]': 'true',
		'display[variants]': 'true',
		limit: '1'
	});

	const res = await fetch(`https://api.kicks.dev/v3/goat/products?${params.toString()}`, {
		headers: { Authorization: `${KICKS_API_KEY}` }
	});

	if (!res.ok) {
		console.error('GOAT error: ', res.status, await res.text());

		return {
			collections: []
		};
	}

	const goatData = await res.json();

	return {
		collections: goatData.data ?? []
	};
};

export const getGoatProducts = async () => {
	const params = new URLSearchParams({
		currency: 'USD',
		filters: 'category = "shoes"',
		'display[prices]': 'true',
		'display[variants]': 'true',
		limit: '20'
	});

	const res = await fetch(`https://api.kicks.dev/v3/goat/products?${params.toString()}`, {
		headers: { Authorization: `${KICKS_API_KEY}` }
	});

	const goatData = await res.json();

	return {
		collections: goatData.data
	};
};
