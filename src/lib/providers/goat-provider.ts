import type { Product } from '$lib/models/product';

export class GoatProvider {
	private apiKey: string;
	private baseUrl = 'https://api.kicks.dev/v3/goat';

	constructor(apiKey: string) {
		this.apiKey = apiKey;
	}

	async getListings(limit = 5, page = 1): Promise<Product[] | null> {
		const params = new URLSearchParams({
			currency: 'USD',
			filters: 'category = "shoes"',
			'display[prices]': 'true',
			'display[variants]': 'true',
			limit: limit.toString(),
			page: page.toString()
		});

		const response = await fetch(`${this.baseUrl}/products?${params.toString()}`, {
			headers: { Authorization: this.apiKey }
		});

		const goatData = await response.json();
		if (!response.ok) {
			throw new Error('No data found.');
		}

		return goatData ?? [];
	}
}
