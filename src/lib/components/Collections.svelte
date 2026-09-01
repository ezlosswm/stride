<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Heart } from '@lucide/svelte';
	import { formatPrice } from '$lib/index';
	import Drawer from './Drawer.svelte';

	let isFavorite = $state<boolean>();

	function handleFavoriteClick(e: Event, sku: string) {
		e.preventDefault();
		e.stopPropagation();

		let sneaker = collection.find((isFav: any) => isFav.sku === sku);

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

	let { collection } = $props();
</script>

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
			<Heart class="transition-colors {collection.isFavorite ? 'fill-danger stroke-danger' : ''}" />
		</Button>
	</div>
	<div class="grid h-full grid-rows-[220px_1fr_auto]">
		<div class="flex min-w-0 items-center justify-center px-4">
			<img
				class="size-full object-contain transition-transform group-hover:scale-105"
				src={collection.imageUrl}
				alt={collection.name}
			/>
		</div>

		<div class="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] gap-4 px-3 py-8">
			<div class="min-w-0">
				<h3 class="font-heading text-lg leading-tight font-semibold tracking-tight">
					{collection.name}
				</h3>

				<p class="mt-1 text-xs text-muted-foreground">
					{collection.colorway}
				</p>
			</div>

			<div class="shrink-0 text-end">
				<p class="font-heading text-xs tracking-tight text-muted-foreground uppercase">best ask</p>
				<p class="font-heading text-xl font-bold">
					{formatPrice(getLowestPrice(collection.markets)?.price)}
				</p>
				<p class="text-xs text-muted-foreground">
					on {getLowestPrice(collection.markets)?.marketplace}
				</p>
			</div>
		</div>

		<div
			class="flex items-center justify-between rounded-xl border border-accent/10
				bg-accent/5 p-2"
		>
			<p class="text-xs">
				<span class="font-semibold">Save</span>
				<span class="font-semibold text-accent">
					{formatPrice(getLowestPrice(collection.markets)?.price)}
				</span>
				on {getLowestPrice(collection.markets)?.marketplace}
			</p>

			<Drawer {collection} />
		</div>
	</div>
</article>
