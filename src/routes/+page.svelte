<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { shoeSizes, sortTypes } from '$lib/filterAndSort.js';
	import Hero from '$lib/components/Hero.svelte';
	import Collections from '$lib/components/Collections.svelte';
	import { Search, LoaderCircle } from '@lucide/svelte';
	import { appendUniqueProducts, debounce, getLowestPrice } from '$lib';

	const schema = {
		'@context': 'https://schema.org',
		'@type': 'WebApplication',
		name: 'STRIDE',
		url: 'https://stride-seven-beta.vercel.app/',
		description: 'Compare sneaker prices across GOAT and StockX to find the better price.',
		applicationCategory: 'ShoppingApplication',
		operatingSystem: 'Web'
	};

	let isLoading = $state<boolean>(false);

	let { data } = $props();
	let collections = $state(data.collections);

	let sortValue = $state('lowest');
	let searchValue = $state('');

	let page = $state<number>(1);
	let isLoadingMore = $state<boolean>(false);
	let hasMore = $state<boolean>(true);

	const limit = 20;

	async function searchProducts(query: string) {
		try {
			isLoading = true;
			const response = await fetch(
				`/search?q=${encodeURIComponent(query)}&size=${shoeSizeValue || 10}&page=1&limit=${limit}`
			);

			if (!response.ok) {
				console.error('Search failed');
				return;
			}

			const products = await response.json();

			collections = products;
		} catch (error) {
			console.error('API Error: ', error);
		} finally {
			isLoading = false;
		}
	}

	async function loadCatalog() {
		try {
			const response = await fetch('/catalog');
			if (!response.ok) {
				console.error('Error ');
			}

			const collection = await response.json();

			console.log('Goat catalog', collection);
		} catch (err) {
			console.error('Load more error:', err);
		}
	}

	$effect(() => {
		loadCatalog();
	});

	async function loadMore() {
		if (isLoadingMore || !hasMore) return;

		try {
			isLoadingMore = true;

			const nextPage = page + 1;

			const endpoint = searchValue.trim()
				? `/search?q=${encodeURIComponent(searchValue)}&size=${shoeSizeValue || 10}&page=${nextPage}&limit=${limit}`
				: `/products?size=${shoeSizeValue || 10}&page=${nextPage}&limit=${limit}`;

			const response = await fetch(endpoint);

			if (!response.ok) {
				console.error('Failed to load more products');
				return;
			}

			const newProducts = await response.json();

			if (newProducts.length === 0) {
				hasMore = false;
				return;
			}

			collections = appendUniqueProducts(collections, newProducts);
			page = nextPage;
		} catch (error) {
			console.error('Load more error:', error);
		} finally {
			isLoadingMore = false;
		}
	}

	const debounceSearch = debounce(searchProducts);

	function handleSearch() {
		debounceSearch(searchValue);
	}

	const displayedCollections = $derived.by(() => {
		const query = searchValue.trim().toLowerCase();

		let results = collections.filter((collection) => {
			if (!query) return true;

			const searchableText = [
				collection.name,
				collection.brand,
				collection.colorway,
				collection.sku
			]
				.filter(Boolean)
				.join(' ')
				.toLowerCase();

			return searchableText.includes(query);
		});

		results = [...results].sort((a, b) => {
			const priceA = getLowestPrice(a);
			const priceB = getLowestPrice(b);

			if (priceA === null && priceB === null) return 0;
			if (priceA === null) return 1;
			if (priceB === null) return -1;

			return sortValue === 'highest' ? priceB - priceA : priceA - priceB;
		});

		return results;
	});

	const triggerContent = $derived(
		sortTypes.find((s) => s.value === sortValue)?.label ?? 'Lowest Price'
	);

	let shoeSizeValue = $state<string>('');
	const shoeSizeTrigger = $derived(shoeSizes.find((s) => s.menSize.toString() === shoeSizeValue));

	async function filterKicksBySize(size: any) {
		const response = await fetch(`/filters/size?size=${encodeURIComponent(size)}`);

		if (!response.ok) {
			throw new Error(`Failed to fetch filtered kicks: ${response.statusText}`);
		}

		const data = await response.json();

		collections = data;
	}
</script>

<svelte:head>
	<title>STRIDE — Compare Sneaker Prices on GOAT & StockX</title>

	<meta
		name="description"
		content="Compare sneaker prices across GOAT and StockX. Search by sneaker, brand, colorway or SKU and find the better price for your size."
	/>

	<link rel="canonical" href="https://stride-seven-beta.vercel.app/" />

	<meta property="og:title" content="STRIDE — Compare Sneaker Prices on GOAT & StockX" />

	<meta
		property="og:description"
		content="Search and compare sneaker prices across GOAT and StockX to find the better deal."
	/>

	<meta property="og:type" content="website" />

	<meta property="og:url" content="https://stride-seven-beta.vercel.app/" />

	<meta name="twitter:card" content="summary_large_image" />
	{@html `<script type="application/ld+json">${JSON.stringify(schema)}<\/script>`}
</svelte:head>

<Hero />

<div id="collections" class="border-t">
	<section
		class="mx-auto grid max-w-7xl grid-cols-1 gap-4 border-t px-4 py-16 md:grid-cols-2 lg:grid-cols-3"
	>
		<div class="col-span-full mb-7 space-y-3">
			<h2 class="font-heading text-4xl font-bold">Find your next pair.</h2>

			<p class="font-heading text-sm text-muted-foreground">A list of pairs worth a closer look.</p>
			<div
				class="items mt-7 flex flex-col justify-between gap-4 md:flex-row md:items-center md:gap-8"
			>
				<div class="relative w-full">
					<Search class="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
					<Input
						bind:value={searchValue}
						oninput={handleSearch}
						class="rounded-full bg-white! p-6 pl-9 text-sm! focus:shadow-[0_0_20px_7px] focus:shadow-accent/20"
						placeholder="Search a sneaker, colorway or brand"
					/>
				</div>
				<div class="flex justify-between gap-4 md:justify-end">
					<div class="flex items-center gap-2">
						<p class="text-xs font-semibold text-muted-foreground">Size</p>
						<Select.Root
							type="single"
							bind:value={shoeSizeValue}
							onValueChange={(value) => {
								if (value) {
									filterKicksBySize(value);
								}
							}}
						>
							<Select.Trigger>
								{#if shoeSizeTrigger}
									M {shoeSizeTrigger.menSize} / W {shoeSizeTrigger.womenSize}
								{:else}
									M 10 / W 11.5
								{/if}
							</Select.Trigger>
							<Select.Content>
								<Select.Group>
									{#each shoeSizes as shoeSize (shoeSize.menSize)}
										<Select.Item value={shoeSize.menSize.toString()} label={shoeSize.value}
											>M {shoeSize.menSize} / W {shoeSize.womenSize}</Select.Item
										>
									{/each}
								</Select.Group>
							</Select.Content>
						</Select.Root>
					</div>

					<div class="flex items-center gap-2">
						<p class="text-xs font-semibold text-muted-foreground">Sort</p>
						<Select.Root type="single" bind:value={sortValue}>
							<Select.Trigger>{triggerContent}</Select.Trigger>
							<Select.Content>
								<Select.Group>
									{#each sortTypes as sortType (sortType.value)}
										<Select.Item value={sortType.value} label={sortType.label}
											>{sortType.label}</Select.Item
										>
									{/each}
								</Select.Group>
							</Select.Content>
						</Select.Root>
					</div>
				</div>
			</div>
		</div>

		{#if displayedCollections.length > 0}
			{#if isLoading}
				{#each Array(6) as _}
					<div class="animate-pulse rounded-xl border p-4">
						<div class="mb-4 h-48 rounded-lg bg-white"></div>

						<div class="mb-2 h-4 w-2/3 rounded bg-white"></div>
						<div class="mb-5 h-3 w-1/2 rounded bg-white"></div>

						<div class="h-5 w-24 rounded bg-white"></div>
					</div>
				{/each}
			{:else}
				{#each displayedCollections as collection (collection.sku)}
					<Collections {collection} />
				{/each}
			{/if}
		{:else}
			<div class="col-span-full py-20 text-center">
				<h3 class="font-heading text-xl font-bold">No sneakers found</h3>

				<p class="mt-2 text-sm text-muted-foreground">
					Try another sneaker, brand, colorway or SKU
				</p>
			</div>
		{/if}
	</section>
	<section class="mx-auto grid max-w-7xl gap-4 px-4">
		{#if isLoadingMore}
			<Button
				onclick={loadMore}
				disabled={isLoadingMore}
				class="mx-auto h-9 w-full bg-info-foreground text-info hover:bg-info-subtle md:w-1/3"
			>
				<LoaderCircle class="mr-2 size-4 animate-spin" />
				Loading more sneakers
			</Button>
		{:else if !hasMore}
			<Button
				onclick={loadMore}
				disabled={true}
				class="mx-auto h-9 w-full bg-danger-subtle text-danger md:w-1/3"
			>
				No more sneakers to show
			</Button>
		{:else}
			<Button
				onclick={loadMore}
				disabled={isLoadingMore}
				class="mx-auto h-9 w-full bg-info-foreground text-info hover:bg-info-subtle md:w-1/3"
			>
				Load More
			</Button>
		{/if}
	</section>

	<!-- Informational -->
	<section class="px-4 pt-16">
		<div class="mx-auto max-w-xl space-y-3 text-center">
			<h3 class="font-medium">Compare GOAT and StockX prices in one place</h3>
			<p class="text-sm text-muted-foreground">
				STRIDE helps sneaker buyers compare asking prices across GOAT and StockX without checking
				each marketplace individually. Choose your size, search for a sneaker, and see where it's
				currently listed for less.
			</p>
		</div>
	</section>
</div>
