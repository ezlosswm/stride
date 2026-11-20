<script>
	import google from '$lib/assets/google-icon-logo.svg';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import RegistrationForm from '$lib/forms/RegistrationForm.svelte';
	import GoogleIcon from '$lib/GoogleIcon.svelte';
</script>

<main class="relative mt-20 grid h-[calc(100vh-5rem)] place-content-center">
	<Card.Root>
		<Card.Header class="mb-3">
			<Card.Title class="text-xl font-semibold">Create account</Card.Title>
			<Card.Description>Create your account.</Card.Description>
		</Card.Header>

		<Card.Content class="space-y-5">
			<RegistrationForm />

			<div class="space-y-3 text-center">
				<p class="text-muted-foreground">
					Already have an account? <span><Button variant="link">Log in</Button></span>
				</p>

				<div class="flex items-center gap-8">
					<div class="h-px flex-1 bg-muted-foreground/25"></div>
					<p class="text-muted-foreground uppercase">OR</p>
					<div class="h-px flex-1 bg-muted-foreground/25"></div>
				</div>

				<Button size="lg" variant="outline" class="w-full gap-2">
					<GoogleIcon />
					Sign up with Google
				</Button>
			</div>
		</Card.Content>
	</Card.Root>
</main>
