<script>
	import logo from '$lib/assets/stride-logo.svg';

	import { Button } from '$lib/components/ui/button/index.js';
	import { Heart, Menu, Search, User, X } from '@lucide/svelte';

	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { fly, slide } from 'svelte/transition';

	let scrolled = $state(false);

	function handleScroll() {
		scrolled = window.scrollY > 0;
	}

	let innerWidth = $state(0);
	let isMobile = $derived(innerWidth < 768);

	$effect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});

	let isSearchOpenMobile = $state(false);
	let isMenuOpen = $state(false);
</script>

<svelte:window bind:innerWidth />

<header class="sticky inset-x-0 top-0 z-10 bg-background px-6 py-4" class:shadow-md={scrolled}>
	{#if isMobile}
		<nav class="mb-3 flex items-center justify-between">
			<div class="flex items-center gap-4">
				<Button href="/" onclick={() => (isMenuOpen = !isMenuOpen)} size="icon-lg" variant="ghost">
					<Menu />
				</Button>
				<Button onclick={() => (isSearchOpenMobile = !isSearchOpenMobile)} variant="ghost">
					<Search />
				</Button>
			</div>
			<Button class="size-20 p-0" variant="ghost">
				<img class="object-contain" src={logo} alt="Stride Logo" />
			</Button>

			<div class="flex items-center gap-4">
				<Button size="icon-lg" variant="ghost">
					<Heart />
				</Button>
			</div>
		</nav>

		<div>
			{#if isSearchOpenMobile}
				<div transition:slide={{ duration: 300 }} class="mx-auto max-w-xl lg:max-w-3xl">
					<Label class="sr-only mb-3">Search for your sneakers</Label>
					<div class="relative">
						<Search
							class="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 text-muted-foreground"
						/>
						<Input placeholder="Search by name, brand or color " class="pl-8" />
					</div>
				</div>
			{/if}
		</div>
	{:else}
		<nav class="mx-auto mb-3 flex w-full max-w-7xl items-center justify-between gap-16">
			<Button href="/" class="size-20 p-0" variant="ghost">
				<img class="object-contain" src={logo} alt="Stride Logo" />
			</Button>

			<div class="w-full">
				<Label class="sr-only mb-3">Search for your sneakers</Label>
				<div class="relative">
					<Search
						class="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 text-base text-muted-foreground"
					/>
					<Input placeholder="Search by name, brand or color " class="pl-8 text-base" />
				</div>
			</div>

			<div class="flex items-center gap-2">
				<Button variant="ghost">About</Button>
				<Button variant="ghost">News</Button>
				<Button href="/auth/register" size="lg">Login or Register</Button>
			</div>
		</nav>
	{/if}
</header>

{#if isMenuOpen}
	<div
		transition:fly={{ x: '-100%', duration: 300 }}
		class="fixed top-0 left-0 z-50 h-dvh w-full overflow-y-clip bg-background"
	>
		<div class="absolute top-8 left-8">
			<Button onclick={() => (isMenuOpen = !isMenuOpen)} size="icon-lg" variant="ghost"
				><X class="size-6 text-muted-foreground" /></Button
			>
		</div>
		<div class="flex h-full flex-col items-center justify-center">
			<Button href="/" variant="ghost" size="icon-lg" class="size-24 ">
				<img src={logo} alt="Stride Logo" class="h-full object-contain" />
			</Button>

			<div class="mx-auto my-auto max-w-4xl space-y-5">
				<Button class="w-full text-lg text-foreground" variant="link">Home</Button>
				<Button class="w-full text-lg text-foreground" variant="link">About</Button>
				<Button class="w-full text-lg text-foreground" variant="link">Favorites</Button>
			</div>

			<Button
				href="/auth/register"
				variant="outline"
				size="lg"
				class="mt-auto w-full py-6 text-base"
			>
				<User class="text-muted-foreground" />
				My Account
			</Button>
		</div>
	</div>
{/if}
