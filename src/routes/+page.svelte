<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import Hero from '$lib/components/Hero.svelte';
	import { ArrowUpRight, Heart, TrendingDown } from '@lucide/svelte';
	import { formatPrice } from '$lib/index';
	import HowItWorks from '$lib/components/HowItWorks.svelte';

	let { data } = $props();
	const collections = $derived(data.collections);

	let isFavorite = $state<boolean>();

	function handleFavoriteClick(e: Event, sku: string) {
		e.preventDefault();
		e.stopPropagation();

		let sneaker = collections.find((isFav) => isFav.sku === sku);

		isFavorite = sneaker?.isFavorite;
		isFavorite = !isFavorite;
	}

	function getLowestPrice(items: any[]) {
		const product = items.filter(
			(item): item is Marketplace & { price: number } => item.price !== undefined
		);

		if (product.length === 0) {
			return null;
		}

		return product.reduce((cheapest, item) => (item.price < cheapest.price ? item : cheapest));
	}
</script>

<Hero />

<div id="collections" class="border-t">
	<section
		class="mx-auto grid max-w-7xl grid-cols-1 gap-4 border-t px-4 py-16 md:grid-cols-2 lg:grid-cols-3"
	>
		<div class="col-span-full space-y-3">
			<div class="mb-5 flex items-center gap-1.5">
				<div
					class="size-2 animate-pulse rounded-full bg-accent shadow-[0_0_30px_5px] shadow-accent/70"
				></div>
				<span class="text-xs font-medium tracking-wide text-muted-foreground uppercase"
					>Curated market board</span
				>
			</div>

			<h2 class="font-heading text-4xl font-bold">Find your next pair.</h2>

			<p class="font-heading text-sm text-muted-foreground">A list of pairs worth a closer look.</p>
		</div>
		{#each collections as collection}
			<article
				class="group relative rounded-xl border bg-card p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg/10"
			>
				<div class="absolute top-4 left-4 z-20">
					<div class="rounded-full border bg-muted px-3 py-1">
						<p class="font-heading text-xs font-bold">{collection.brand}</p>
					</div>
				</div>
				<div class="absolute top-4 right-4 z-20">
					<Button
						onclick={(e) => handleFavoriteClick(e, collection.sku)}
						variant="outline"
						size="icon-lg"
						class="rounded-full {collection.isFavorite ? 'bg-danger-subtle' : ''}"
					>
						<Heart
							class="transition-colors {collection.isFavorite ? 'fill-danger stroke-danger' : ''}"
						/>
					</Button>
				</div>
				<a href={`/item/${collection.sku}`} class="flex h-full flex-col items-center">
					<img
						class="max-h-full max-w-full object-contain transition-all group-hover:scale-105"
						src={collection.imageUrl}
						alt={collection.name}
					/>

					<!-- Card content -->
					<div class="flex w-full flex-1 px-3 py-8">
						<div class="flex-1">
							<div class="w-3/4">
								<h3 class="font-heading text-lg leading-tight font-semibold tracking-tight">
									{collection.name}
								</h3>
							</div>
							<p class="mt-1 text-xs text-muted-foreground">{collection.colorway}</p>
						</div>
						<div class="text-end">
							<p class="font-heading text-xs tracking-tight text-muted-foreground uppercase">
								best ask
							</p>
							<p class="font-heading text-xl font-bold">
								{formatPrice(getLowestPrice(collection.markets)?.price)}
							</p>
							<p class="text-xs text-muted-foreground">
								on {getLowestPrice(collection.markets)?.marketplace}
							</p>
						</div>
					</div>

					<!-- Card footer -->
					<div
						class="flex w-full items-center justify-between rounded-xl border border-accent/10 bg-accent/5 p-2"
					>
						<div class="flex items-center gap-1.5 text-xs">
							<p>
								<span class="font-semibold">Save</span>
								<span class="text-xs font-semibold text-accent"
									>{formatPrice(getLowestPrice(collection.markets)?.price)}</span
								>
								on {getLowestPrice(collection.markets)?.marketplace}
							</p>
						</div>

						<div>
							<Button class="text-xs" variant="link">
								Compare
								<span>
									<ArrowUpRight />
								</span>
							</Button>
						</div>
					</div>
				</a>
			</article>
		{/each}
	</section>
</div>

<HowItWorks />
