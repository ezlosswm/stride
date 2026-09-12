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
		console.error('StockX error: ', res.status, await res.text());

		return {
			collections: []
		};
	}

	const stockXData = await res.json();

	return {
		collections: stockXData.data ?? []
	};
};

export const getStockXProducts = async (page = 1, limit = 20) => {
	const params = new URLSearchParams({
		currency: 'USD',
		market: 'US',
		filters: 'product_type = "sneakers" AND gender = "men"',
		'display[prices]': 'true',
		'display[variants]': 'true',
		limit: limit.toString(),
		page: page.toString()
	});
	const res = await fetch(`https://api.kicks.dev/v3/stockx/products?${params.toString()}`, {
		headers: { Authorization: `${KICKS_API_KEY}` }
	});

	const stockXData = await res.json();
	if (!res.ok) {
		console.error('StockX get list of products error: ', stockXData);

		return {
			collections: [],
			meta: null
		};
	}

	return {
		collections: stockXData.data ?? [],
		meta: stockXData.meta ?? null
	};
};

export const searchStockXProducts = async (query: string, page = 1, limit = 20) => {
	const params = new URLSearchParams({
		query,
		currency: 'USD',
		market: 'US',
		filters: 'product_type = "sneakers" AND gender = "men"',
		'display[prices]': 'true',
		'display[variants]': 'true',
		limit: limit.toString(),
		page: page.toString()
	});

	const res = await fetch(`https://api.kicks.dev/v3/stockx/products?${params.toString()}`, {
		headers: { Authorization: `${KICKS_API_KEY}` }
	});

	const stockXData = await res.json();

	if (!res.ok) {
		console.error('StockX seach error: ', stockXData);

		return {
			collections: []
		};
	}

	return {
		collections: stockXData.data ?? []
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

	const goatData = await res.json();
	if (!res.ok) {
		console.error('GOAT error: ', res.status, await res.text());

		return {
			collections: []
		};
	}

	return {
		collections: goatData.data ?? []
	};
};

export const getGoatProducts = async (page = 1, limit = 20) => {
	const params = new URLSearchParams({
		currency: 'USD',
		filters: 'category = "shoes"',
		'display[prices]': 'true',
		'display[variants]': 'true',
		limit: limit.toString(),
		page: page.toString()
	});

	const res = await fetch(`https://api.kicks.dev/v3/goat/products?${params.toString()}`, {
		headers: { Authorization: `${KICKS_API_KEY}` }
	});

	const goatData = await res.json();
	if (!res.ok) {
		console.error('GOAT get list of products error: ', goatData);
		return {
			collections: [],
			meta: null
		};
	}

	return {
		collections: goatData.data ?? [],
		meta: goatData.meta ?? null
	};
};

export const searchGoatProducts = async (query: string, page = 1, limit = 20) => {
	const search = query.trim();
	if (!search) {
		return {
			collections: []
		};
	}

	const params = new URLSearchParams({
		query: search,
		currency: 'USD',
		filters: 'category = "shoes"',
		'display[prices]': 'true',
		'display[variants]': 'true',
		limit: limit.toString(),
		page: page.toString()
	});

	const res = await fetch(`https://api.kicks.dev/v3/goat/products?${params.toString()}`, {
		headers: { Authorization: `${KICKS_API_KEY}` }
	});

	console.log('GOAT URL:', `https://api.kicks.dev/v3/goat/products?${params.toString()}`);

	const goatData = await res.json();
	if (!res.ok) {
		console.error('GOAT search error: ', goatData);
		return {
			collections: []
		};
	}

	return {
		collections: goatData.data ?? []
	};
};
