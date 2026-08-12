<script>
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Input } from '$lib/components/ui/input/index.js';

	import googleIcon from '$lib/assets/google-icon-logo.svg';
</script>

<div class="min-h-screen">
	<Card.Root class="mx-auto max-w-xl">
		<Card.Header class="text-center">
			<Card.Title class="text-2xl font-bold">Welcome to Stride!</Card.Title>
			<Card.Description>Enter your email address to Sign Up or Log In</Card.Description>
		</Card.Header>

		<form class="mx-auto w-full max-w-md">
			<div class="space-y-1">
				<Label>Enter your email address</Label>
				<Input placeholder="Email Adress *" />
			</div>
		</form>

		<Card.Footer class="mx-auto">
			<Button
				aria-label="Sign in with Google"
				href="/auth/google"
				variant="outline"
				class="gap-1.5 text-sm"
			>
				<img src={googleIcon} alt="Google Icon" class="size-4" />
				Sign up with Google
			</Button>
		</Card.Footer>
	</Card.Root>
</div>
