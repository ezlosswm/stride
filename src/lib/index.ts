// place files you want to import through the `$lib` alias in this folder.
export function formatPrice(price: number): string {
	return `$${price.toFixed(2)}`;
}

// Test function to simulate favoriting a shoe
export function testLikeButton(shoeId: string): void {
	console.log(`Like button clicked for shoe ID: ${shoeId}`);
}
