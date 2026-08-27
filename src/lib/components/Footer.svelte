<script>
	import logo from '$lib/assets/stride-logo.svg';
	import { Button } from '$lib/components/ui/button/index';
</script>

<footer class="mx-auto max-w-7xl">
	<div class="flex flex-col items-start justify-between px-4 py-16 md:flex-row md:items-center">
		<Button class="size-24 p-0" variant="secondary" href="/">
			<img src={logo} class="h-full object-cover" alt="Stride Logo" />
		</Button>

		<p class="text-xs text-muted-foreground">Built for clearer buying decisions</p>
	</div>
</footer>
