<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { formatPrice, testLikeButton } from '$lib/index';
	import { Heart } from '@lucide/svelte';

	let isFavorited = $state(false);

	function handleFavoriteClick(e: Event, collectionId: string) {
		e.preventDefault();
		e.stopPropagation();

		isFavorited = !isFavorited;

		testLikeButton(collectionId);
	}

	let { data } = $props();
	const collections = $derived(data.collections);
</script>

<h2>Collections</h2>

<main>
	<section class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
		{#each collections.data as collection}
			<article class="relative rounded border p-1">
				<div class="absolute top-4 right-4">
					<Button
						onclick={(e) => handleFavoriteClick(e, collection.id)}
						variant="outline"
						size="icon-lg"
						class="rounded-full"
					>
						<Heart class="transition-colors {isFavorited ? 'fill-foreground ' : ''}" />
					</Button>
				</div>
				<a href={`/item/${collection.id}`} class="flex h-full flex-col items-center">
					<img
						class="max-h-full max-w-full object-contain"
						src={collection.image}
						alt={collection.title}
					/>

					<div class="flex w-full flex-1 flex-col px-3 py-8">
						<h3 class="font-medium">{collection.title}</h3>
						<p class="text-sm">{collection.brand}</p>
						<div class="mt-2 flex grow flex-col justify-end">
							<p class="text-xs text-muted-foreground">
								Lowest Price: <span class="text-sm font-medium text-foreground">
									{formatPrice(collection.min_price)}
								</span>
							</p>
						</div>
					</div>
				</a>
			</article>
		{/each}
	</section>
</main>
