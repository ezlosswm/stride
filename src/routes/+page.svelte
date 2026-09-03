<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { shoeSizes, sortTypes } from '$lib/filterAndSort.js';
	import Hero from '$lib/components/Hero.svelte';
	import Collections from '$lib/components/Collections.svelte';
	import { Search } from '@lucide/svelte';

	let isLoading = $state<boolean>(false);

	let { data } = $props();
	let collections = $state(data.collections);

	let sortValue = $state('lowest');
	let searchValue = $state('');

	async function searchProducts(query: string) {
		if (!query.trim()) {
			return;
		}

		try {
			isLoading = true;
			const response = await fetch(
				`/search?q=${encodeURIComponent(query)}&size=${shoeSizeValue || 10}`
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

	function debounce(callback: any, delay = 600) {
		let timeoutId: ReturnType<typeof setTimeout> | undefined;

		return function (this: any, ...args: any[]) {
			if (timeoutId !== undefined) {
				clearTimeout(timeoutId);
			}

			timeoutId = setTimeout(() => {
				callback.apply(this, args);
			}, delay);
		};
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

	function getLowestPrice(collection: Sneaker): number | null {
		const prices = collection.markets
			.map((market) => market.price)
			.filter((price): price is number => price !== null);

		return prices.length ? Math.min(...prices) : null;
	}
</script>

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
</div>
