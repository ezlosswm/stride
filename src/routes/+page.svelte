<script lang="ts">
	import nike from '$lib/assets/nike-gt-cut-4.avif';
	import Button from '$lib/components/ui/button/button.svelte';
	import { formatPrice } from '$lib/index';
	import { ArrowUpRight, Check, ChevronDown, Heart, TrendingDown } from '@lucide/svelte';

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

<h2>Collections</h2>

<main class="mt-10 min-h-dvh border-b">
	<div class="relative -top-8 left-64 -z-40">
		<div
			class="absolute top-1/2 left-1/2 size-36 -translate-1/2 rounded-full border border-accent bg-transparent shadow-[0px_0px_50px_50px] shadow-accent/16"
		>
			<div
				class="absolute top-1/2 left-1/2 size-28 -translate-1/2 rounded-full border bg-transparent"
			>
				<div
					class="absolute top-1/2 left-1/2 size-20 -translate-1/2 rounded-full border bg-transparent"
				></div>
			</div>
		</div>
	</div>

	<div>
		<div class="flex items-center gap-1.5">
			<div
				class="size-2 animate-pulse rounded-full bg-accent shadow-[0_0_30px_5px] shadow-accent/70"
			></div>
			<span class="text-xs font-medium tracking-wider text-muted-foreground uppercase"
				>THE SMARTER WAY TO BUY SNEAKERS</span
			>
		</div>

		<div class="space-y-3">
			<h1 class="font-heading text-5xl font-bold tracking-tight">
				<span> One pair. </span>
				<br />
				<span class="text-muted-foreground">Two markets.</span>
				<br />
				<span> One clear choice. </span>
			</h1>
			<p>
				STRIDE compares sneaker prices across StockX and GOAT, so you can quickly see where to buy,
				what you'll pay, and when the price is right.
			</p>
		</div>

		<Button class="mt-7 h-10 rounded-full px-6 py-3 font-bold" size="lg"
			>Start Comparing <span><ChevronDown /></span></Button
		>
	</div>

	<div class="flex items-end gap-8">
		<div class=" max-w-40 space-y-1 rounded-3xl bg-foreground p-4 text-background">
			<div class="flex items-center gap-1.5">
				<div
					class="size-2 animate-pulse rounded-full bg-accent shadow-[0_0_30px_5px] shadow-accent/70"
				></div>
				<span class="font-font-heading text-xs font-medium tracking-wider text-muted uppercase"
					>StockX leads</span
				>
			</div>

			<p class="font-heading font-bold">by $8</p>
		</div>

		<article
			class="relative max-w-96 -translate-y-1 rotate-6 rounded-xl border bg-card p-4 shadow-lg/10"
		>
			<div class="absolute top-4 left-4">
				<div class="rounded-full bg-muted px-3 py-1 text-muted-foreground">
					<p class="font-heading text-xs font-bold">Nike</p>
				</div>
			</div>
			<div class="flex h-full flex-col items-center">
				<img class="max-h-full max-w-full object-contain" src={nike} alt="Nike Air Zoom GT Cut 4" />

				<!-- Card content -->
				<div class="flex w-full flex-1 px-3 py-8">
					<div class="flex-1">
						<div class="w-3/4">
							<h3 class="font-heading font-bold tracking-tight">Nike Air Zoom GT Cut 4</h3>
						</div>
						<p class="mt-1 text-xs text-muted-foreground">University Red Black</p>
					</div>
					<div class="text-end">
						<p class="font-heading font-bold text-foreground">$128</p>
						<p class="mt-1 font-heading text-xs tracking-tight text-muted-foreground">best ask</p>
					</div>
				</div>
			</div>
		</article>
	</div>

	<div class="col-span-full border-t py-4">
		<div class="flex w-full">
			<div class="flex items-center gap-1.5">
				<Check class="size-4" />
				<p class="text-xs">Compare all-in totals</p>
			</div>

			<div class="flex items-center gap-1.5">
				<Check class="size-4" />
				<p class="text-xs">Check your size</p>
			</div>

			<div class="flex items-center gap-1.5">
				<Check class="size-4" />
				<p class="text-xs">Save your favorite</p>
			</div>
		</div>
	</div>
</main>

<section class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
	<div class="col-span-full space-y-3">
		<div class="mb-3 flex items-center gap-1.5">
			<div
				class="size-2 animate-pulse rounded-full bg-accent shadow-[0_0_30px_5px] shadow-accent/70"
			></div>
			<span class="text-[10px] font-medium tracking-wide text-muted-foreground uppercase"
				>Curated market board</span
			>
		</div>

		<h2 class="font-heading text-4xl font-bold">Find your next pair.</h2>

		<p class="font-heading text-sm text-muted-foreground">A list of pairs worth a closer look.</p>
	</div>
	{#each collections as collection}
		<article
			class="relative rounded-xl border bg-card p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg/10"
		>
			<div class="absolute top-4 left-4">
				<div class="rounded-full bg-muted px-3 py-1 text-muted-foreground">
					<p class="font-heading text-xs font-bold">{collection.brand}</p>
				</div>
			</div>
			<div class="absolute top-4 right-4">
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
					class="max-h-full max-w-full object-contain"
					src={collection.imageUrl}
					alt={collection.name}
				/>

				<!-- Card content -->
				<div class="flex w-full flex-1 border-b px-3 py-8">
					<div class="flex-1">
						<div class="w-3/4">
							<h3 class="font-heading font-bold tracking-tight">{collection.name}</h3>
						</div>
						<p class="mt-1 text-xs text-muted-foreground">{collection.colorway}</p>
					</div>
					<div class="text-end">
						<p class="font-heading font-bold text-foreground">
							{formatPrice(getLowestPrice(collection.markets)?.price)}
						</p>
						<p class="mt-1 font-heading text-xs tracking-tight text-muted-foreground">best ask</p>
					</div>
				</div>

				<!-- Card footer -->
				<div class="flex w-full items-center justify-between pt-4">
					<div class="flex items-center gap-1.5 text-[10px] text-muted-foreground">
						<TrendingDown class="size-3" />
						<p>
							{getLowestPrice(collection.markets)?.marketplace}
							leads by
						</p>
					</div>

					<div>
						<Button variant="link">
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
