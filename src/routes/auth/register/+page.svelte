<script>
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Input } from '$lib/components/ui/input/index.js';

	import googleIcon from '$lib/assets/google-icon-logo.svg';
</script>

<div class="min-h-screen">
	<Card.Root class="mx-auto mt-7 max-w-xl">
		<Card.Header class="text-center">
			<Card.Title class="text-2xl font-bold">Welcome to Stride!</Card.Title>
			<Card.Description>Enter your email address to Sign Up or Log In</Card.Description>
		</Card.Header>

		<Card.Content>
			<form class="mx-auto w-full max-w-md space-y-5">
				<div class="flex gap-1.5">
					<div class="flex-1 space-y-1">
						<Label>First Name</Label>
						<Input placeholder="John" />
					</div>
					<div class="flex-1 space-y-1">
						<Label>Last Name</Label>
						<Input placeholder="Doe" />
					</div>
				</div>
				<div class="space-y-1">
					<Label>Enter your email address</Label>
					<Input placeholder="Email Adress *" />
				</div>
				<div class="space-y-1">
					<Label>Password</Label>
					<Input placeholder="********" />
				</div>
				<div class="space-y-1">
					<Label>Confirm your password</Label>
					<Input placeholder="********" />
				</div>

				<Button aria-label="Register for Stride" size="lg" class="w-full text-sm">Register</Button>
			</form>

			<div class="mt-5">
				<p class="text-center font-medium text-muted-foreground">OR</p>
			</div>
		</Card.Content>

		<Card.Footer class="mx-auto w-full">
			<Button
				aria-label="Sign in with Google"
				href="/auth/google"
				variant="outline"
				class="mx-auto w-full max-w-md gap-1.5 text-sm"
			>
				<img src={googleIcon} alt="Google Icon" class="size-4" />
				Sign up with Google
			</Button>
		</Card.Footer>
	</Card.Root>
</div>
