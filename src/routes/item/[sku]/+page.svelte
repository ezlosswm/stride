<script lang="ts">
	import { ArrowLeft, Heart } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import { compareMarkets } from '$lib/kickFormatters.js';

	let { data } = $props();
	// const shoeId = $derived(params.shoeId);

	const collection = $derived(data.collections);
	console.log('collection', collection);

	let isFavorite = $state<boolean>();

	function handleFavoriteClick(e: Event, sku: string) {
		e.preventDefault();
		e.stopPropagation();

		let sneaker = collection.find((isFav: any) => isFav.sku === sku);

		isFavorite = sneaker?.isFavorite;
		isFavorite = !isFavorite;
	}
</script>

<main class="mt-20">
	<div class="mb-9">
		<Button class="gap-1.5 text-muted-foreground" variant="ghost" href="/">
			<ArrowLeft />
			Back to Collections
		</Button>
	</div>

	<div class="grid grid-cols-1 gap-4 bg-white px-4">
		<!-- grid one -->
		<img src={collection[0].imageUrl} alt={collection[0].name} class="h-full max-w-md rounded-xl" />

		<!-- grid two -->
		<div>
			<div class="flex w-full items-center justify-between">
				<h1 class="font-bold/tight text-xl">
					{collection[0].name}
				</h1>

				<Button
					onclick={(e) => handleFavoriteClick(e, collection[0].sku)}
					variant="outline"
					size="icon-lg"
					class="rounded-full {collection[0].isFavorite ? 'bg-danger-subtle' : ''}"
				>
					<Heart
						class="transition-colors {collection[0].isFavorite ? 'fill-danger stroke-danger' : ''}"
					/>
				</Button>
			</div>

			<p class="text-xs font-medium">
				{collection[0].colorway}
			</p>
			<p class="text-xs text-muted-foreground">
				Style Code: {collection[0].sku}
			</p>
		</div>

		<!-- grid three -->
		<div class="rounded-xl border p-4">
			<h4 class="font-heading text-sm/relaxed font-medium">Price Comparison</h4>

			<Table.Root>
				<Table.Body>
					<Table.Row>
						<Table.Cell class="w-full">{collection[0].markets[0].marketplace}</Table.Cell>
						<Table.Cell class="w-1/2">{collection[0].markets[0].price}</Table.Cell>
						<Table.Cell>
							<Button size="lg" href={collection[0].markets[0].url} class="p-4">Buy Now</Button>
						</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table.Root>
		</div>
	</div>
</main>
