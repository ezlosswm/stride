<script>
	import logo from '$lib/assets/stride-logo.svg';

	import { Button } from '$lib/components/ui/button/index.js';
	import { Menu, Search } from '@lucide/svelte';

	let scrolled = $state(false);

	function handleScroll() {
		scrolled = window.scrollY > 0;
	}

	$effect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<header class="sticky inset-x-0 top-0 z-10 bg-background" class:shadow-md={scrolled}>
	<nav class="flex items-center justify-between px-6 py-4">
		<Button variant="ghost" href="/">
			<img class="size-24" src={logo} alt="Stride Logo" />
		</Button>

		<div class="flex items-center gap-4">
			<Menu />
			<Search />
		</div>
	</nav>
</header>
