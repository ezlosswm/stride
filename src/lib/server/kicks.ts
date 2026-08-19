import { KICKS_API_KEY } from '$env/static/private';

export const getStockXProducts = async () => {
	const params = new URLSearchParams({
		currency: 'USD',
		market: 'US',
		'display[prices]': 'true',
		'display[variants]': 'true'
	});
	const res = await fetch(
		`https://api.kicks.dev/v3/stockx/products?${params.toString()}&limit=10`,
		{
			headers: { Authorization: `${KICKS_API_KEY}` }
		}
	);

	const stockXData = await res.json();

	return {
		collections: stockXData.data
	};
};

export const getGoatProducts = async () => {
	const params = new URLSearchParams({
		currency: 'USD',
		fitlers: 'category = "shoes"',
		'display[prices]': 'true',
		'display[variants]': 'true'
	});

	const res = await fetch(`https://api.kicks.dev/v3/goat/products?${params.toString()}&limit=10`, {
		headers: { Authorization: `${KICKS_API_KEY}` }
	});

	const goatData = await res.json();

	return {
		collections: goatData.data
	};
};
