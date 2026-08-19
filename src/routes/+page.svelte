<script lang="ts">
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { formatPrice, testLikeButton } from '$lib/index';
	import { Heart, TrendingUp } from '@lucide/svelte';

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
</script>

<h2>Collections</h2>

<main>
	<section class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
		{#each collections as collection}
			<article class="relative rounded border p-1 shadow-sm transition-shadow hover:shadow-lg/5">
				<div class="absolute top-4 right-4">
					<Button
						onclick={(e) => handleFavoriteClick(e, collection.sku)}
						variant="outline"
						size="icon-lg"
						class="rounded-full"
					>
						<Heart class="transition-colors {collection.isFavorite ? 'fill-foreground ' : ''}" />
					</Button>
				</div>
				<a href={`/item/${collection.sku}`} class="flex h-full flex-col items-center">
					<img
						class="max-h-full max-w-full object-contain"
						src={collection.imageUrl}
						alt={collection.name}
					/>

					<div class="flex w-full flex-1 flex-col px-3 py-8">
						<span><Badge variant="secondary">{collection.brand}</Badge></span>
						<h3 class="font-bold">{collection.name}</h3>
						<p class="text-sm text-muted-foreground">{collection.colorway}</p>
						<div class="mt-8 flex w-full grow items-end justify-between">
							<div>
								<p class="text-xs text-muted-foreground">Lowest Price</p>
								<p class=" font-bold text-foreground">
									<!-- {formatPrice(collection.)} -->
								</p>
							</div>

							<TrendingUp class="text-primary" />
						</div>
					</div>
				</a>
			</article>
		{/each}
	</section>
</main>
