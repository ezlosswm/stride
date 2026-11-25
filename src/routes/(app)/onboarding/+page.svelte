<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import OnboardingForm from '$lib/forms/OnboardingForm.svelte';
</script>

<main class="mt-20 min-h-screen">
	<Card.Root>
		<div class="flex justify-between px-[--card-spacing] text-xs">
			<p class="font-medium text-primary">Step 1 of 1 - Fit preferences</p>
			<p class="text-muted-foreground">US Sizing</p>
		</div>
		<Card.Header>
			<Card.Title>Set your default sneaker size.</Card.Title>
			<Card.Description>
				We use your gender and shoe size to show the most accurate information when searching for
				your favorite shoes.
			</Card.Description>
		</Card.Header>
		<Card.Content>
			<OnboardingForm />
		</Card.Content>
	</Card.Root>
</main>
