import { normalizeSKU } from '$lib/kickFormatters';
import type { Product } from '$lib/models/product';

export class StockXProvider {
	private apiKey: string;
	private baseUrl = 'https://api.kicks.dev/v3/stockx';

	constructor(apiKey: string) {
		this.apiKey = apiKey;
	}

	async getListings(skus: string[]) {
		for (const sku of skus) {
			try {
				return await this.searchListing(sku);
			} catch (error) {
				throw new Error('Unable to find listing');
			}
		}
	}

	private async searchListing(sku: string, limit = 5, page = 1): Promise<Product | null> {
		const params = new URLSearchParams({
			currency: 'USD',
			'display[prices]': 'true',
			'display[variants]': 'true',
			filters: 'product_type = "sneakers" AND gender = "men"',
			limit: limit.toString(),
			page: page.toString()
		});

		const response = await fetch(
			`${this.baseUrl}/products?${encodeURIComponent(normalizeSKU(sku))}?${params.toString()}`,
			{
				headers: { Authorization: this.apiKey }
			}
		);

		const stockXData = await response.json();
		if (!response.ok) {
			throw new Error('No data found.');
		}

		return stockXData ?? [];
	}
}
