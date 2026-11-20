export class Sneaker {
	constructor(
		readonly id: string,
		public brand: string,
		public name: string,
		readonly slug: string
	) {}
}
