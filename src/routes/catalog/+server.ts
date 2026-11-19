import { PCKT_API_KEY } from '$env/static/private';
import { KICKS_API_KEY } from '$env/static/private';
import { error } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

async function fetchGoatCatalog() {
	const limit: number = 10; // default to 10
	const page: number = 1;

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
}

export async function GET({ url }) {
	const res = await fetch(`https://api.pckt.sh/v1/catalog/goat/products`, {
		headers: { Authorization: `Bearer ${PCKT_API_KEY}` }
	});

	const goatData = await res.json();
	if (!res.ok) {
		console.error('GOAT get list of products error: ', goatData);
		return error(400, 'Nonthin');
	}

	return json(goatData.products);
}
