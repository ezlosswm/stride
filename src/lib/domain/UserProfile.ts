export class UserProfile {
	constructor(
		private readonly id: string,
		private readonly userId: string,
		public gender: string,
		public shoeSize: string
	) {}
}
