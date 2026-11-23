export class RegisterUserProps {
	constructor(
		public firstName: string,
		public lastName: string,
		public readonly email: string,
		readonly password: string
	) {}
}
