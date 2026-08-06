// import { KICKS_API_KEY } from '$env/static/private';
import { singleProduct } from '$lib/sampleData.js';

// Single loaded shoe data
// export const load = async ({ fetch }) => {
// 	const shoeId = '7ed8723a-ad44-4449-be54-6294fd71f769';
// 	const res = await fetch(`https://api.kicks.dev/v3/stockx/products/${shoeId}`, {
// 		headers: {
// 			Authorization: `${KICKS_API_KEY}`
// 		}
// 	});

// 	const data = await res.json();
// 	console.log('data', data);

// 	return {
// 		produt: data
// 	};
// };

export const load = async () => {
	return {
		product: singleProduct
	};
};
