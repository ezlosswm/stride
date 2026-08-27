<script>
	import logo from '$lib/assets/stride-logo.svg';
	import { navLinks } from '$lib/navLinks';

	import { Button } from '$lib/components/ui/button/index.js';
	import { Heart, Menu, Search, User, X } from '@lucide/svelte';

	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { fly, slide } from 'svelte/transition';
	import { iso } from 'zod';

	let scrolled = $state(false);

	function handleScroll() {
		scrolled = window.scrollY > 0;
	}

	let innerWidth = $state(0);
	let isMobile = $derived(innerWidth < 768);

	let isMenuOpen = $state(false);

	$effect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<svelte:window bind:innerWidth />

<header
	class="sticky inset-x-0 top-0 z-80 bg-background px-6 pb-0 {isMenuOpen ? 'shadow-sm' : ''}"
	class:shadow-md={scrolled}
	class:border-b={isMenuOpen}
	class:pb-4={isMenuOpen}
>
	{#if isMobile}
		<nav class="mb-3 flex items-center justify-between {isMenuOpen ? 'border-b' : ''}">
			<Button href="/" class="size-20 p-0" variant="ghost">
				<img class="object-cover" src={logo} alt="Stride Logo" />
			</Button>

			<Button
				onclick={() => (isMenuOpen = !isMenuOpen)}
				class="rounded-full"
				size="icon-lg"
				variant="outline"
			>
				<Menu />
			</Button>
		</nav>

		{#if isMenuOpen}
			<div transition:slide={{ duration: 200 }} class="flex flex-col gap-4">
				{#each navLinks as nav (nav.title)}
					<Button variant={nav.variant} size="lg" class="w-full justify-start" href={nav.href}
						>{nav.title}</Button
					>
				{/each}
			</div>
		{/if}
	{:else}
		<nav class="mx-auto flex w-full max-w-7xl items-center justify-between gap-16">
			<Button href="/" class="size-20 p-0" variant="ghost">
				<img class="object-contain" src={logo} alt="Stride Logo" />
			</Button>

			<div class="flex items-center gap-2">
				{#each navLinks as nav (nav.title)}
					<Button variant={nav.variant} href={nav.href}>{nav.title}</Button>
				{/each}
			</div>

			<Button href="/auth/register" size="lg">Get Started</Button>
		</nav>
	{/if}
</header>
