export class User {
	constructor(
		public firstName: string,
		public lastName: string,
		public readonly email: string,
		public createdAt: string,
		protected isActive: boolean = true
	) {}
}
