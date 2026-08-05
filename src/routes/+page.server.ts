// import { KICKS_API_KEY } from '$env/static/private';
import { data } from '$lib/sampleData';

// export const load = async ({ fetch }) => {
// 	const params = new URLSearchParams({
// 		currency: 'USD',
// 		market: 'US',
// 		'display[prices]': 'true'
// 	});
// 	const res = await fetch(
// 		`https://api.kicks.dev/v3/stockx/products?${params.toString()}&limit=10`,
// 		{
// 			headers: { Authorization: `${KICKS_API_KEY}` }
// 		}
// 	);

// 	const data = await res.json();

// 	console.log('data', data);

// 	return {
// 		collections: data
// 	};
// };

export const load = async () => {
	console.log('data', data);

	return {
		collections: data
	};
};
