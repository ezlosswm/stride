<script>
	import logo from '$lib/assets/stride-logo.svg';
	import { Button } from '$lib/components/ui/button/index';
</script>

<footer class="flex w-full flex-col items-start md:flex-row md:items-center">
	<div class="px-4 py-16">
		<Button class="size-24 p-0" variant="secondary" href="/">
			<img src={logo} class="h-full object-cover" alt="Stride Logo" />
		</Button>

		<p class="text-xs text-muted-foreground">Built for clearer buying decisions</p>
	</div>
</footer>
