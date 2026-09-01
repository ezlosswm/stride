// import { KICKS_API_KEY } from '$env/static/private';
import { singleProduct } from '$lib/sampleData.js';
import { fail, redirect, text } from '@sveltejs/kit';
import {
	normalizeStockX,
	normalizeGoat,
	isAdultGoatProduct,
	mergeSneakers
} from '$lib/kickFormatters.js';
import { getStockXProduct, getGoatProduct } from '$lib/server/kicks.js';

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

export const load = async ({ params }) => {
	const [stockxResponse, goatResponse] = await Promise.all([
		getStockXProduct(params.sku),
		getGoatProduct(params.sku)
	]);

	const stockx = stockxResponse.collections.map(normalizeStockX);
	const goat = goatResponse.collections.map(normalizeGoat);

	const product = mergeSneakers(stockx, goat);

	return {
		collections: product
	};
};

export const actions = {
	default: async ({ url, request, locals: { getUser, supabase } }) => {
		console.log('Form submitted');
		const user = await getUser();
		if (!user) {
			throw redirect(303, '/auth/register');
		}

		const { error } = await supabase
			.from('products')
			.upsert({
				id: user.id,
				external_id: '1',
				title: 'nike',
				brand: '',
				model: '',
				gender: '',

				description: '',
				image_url: '',
				product_url: '',
				slug: '',

				sku: '',
				product_type: 'text',
				category: 'sneaker',
				secondary_category: '',

				min_price: 100,
				max_price: 400,
				avg_price: 240,

				upcoming: false,

				api_created_at: null,
				api_updated_at: null
			})
			.select();

		if (error) {
			console.error('Error inserting into products table.', error.message);
			return fail(500, {
				errorMessage: error.message
			});
		}
	}
};
