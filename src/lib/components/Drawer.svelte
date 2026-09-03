<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import { ArrowUpRight, ChevronLeft, CircleAlert, Heart } from '@lucide/svelte';
	import { compareMarkets, formatPrice } from '$lib/kickFormatters';
	import Badge from './ui/badge/badge.svelte';
	let { collection } = $props();

	let isFavorite = $state<boolean>();

	function handleFavoriteClick(e: Event, sku: string) {
		e.preventDefault();
		e.stopPropagation();

		let sneaker = collection.find((isFav: any) => isFav.sku === sku);

		isFavorite = sneaker?.isFavorite;
		isFavorite = !isFavorite;
	}

	const comparison = $derived(compareMarkets(collection));
	function isLowestAsk(markets: Marketplace) {
		return comparison.lowerMarket?.marketplace === markets.marketplace;
	}
</script>

<Sheet.Root>
	<Sheet.Trigger class={buttonVariants({ variant: 'ghost' })}>
		<span class="font-medium text-primary"> Compare </span>
		<ArrowUpRight class="size-4 stroke-primary" />
	</Sheet.Trigger>

	<Sheet.Content side="right" class="z-90 w-svw! max-w-xl!">
		<Sheet.Header>
			<Sheet.Title class="space-y-5">
				<Sheet.Close class="flex items-center justify-between">
					<div
						class="inline-flex items-center gap-1 text-xs/relaxed font-medium text-muted-foreground transition-colors hover:text-foreground"
					>
						<ChevronLeft class="size-4" />
						Back to all sneakers
					</div>
				</Sheet.Close>

				<div class="flex items-start justify-between gap-12">
					<div class="space-y-1">
						<h2 class="font-heading text-2xl/tight font-bold">{collection.name}</h2>
						<p class="text-sm text-muted-foreground">{collection.colorway}</p>
					</div>

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
			</Sheet.Title>
			<img
				src={collection.imageUrl}
				alt={collection.name}
				class="size-full max-h-52 rounded-xl object-contain"
			/>

			<Sheet.Description class="mt-7 space-y-3">
				<div>
					<h4 class="font-heading text-lg font-bold text-foreground">Price Comparison</h4>
					Save<span class="font-semibold">
						{formatPrice(compareMarkets(collection).priceDifference)}
					</span>
					on {compareMarkets(collection).lowerMarket.marketplace}
				</div>

				<Table.Root>
					<Table.Caption class="sr-only">A list of prices from StockX and GOAT.</Table.Caption>
					<Table.Header>
						<Table.Row>
							<Table.Head>Seller</Table.Head>
							<Table.Head>Price</Table.Head>
							<Table.Head></Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{#each collection.markets as market (market.marketplace)}
							<Table.Row>
								<Table.Cell class="w-full">
									<div class="flex items-center gap-2">
										<span class="text-sm font-bold text-foreground">
											{market.marketplace}
										</span>

										{#if isLowestAsk(market)}
											<Badge class="bg-info-foreground text-info" variant="secondary"
												>Lowest Ask</Badge
											>
										{/if}
									</div>
								</Table.Cell>

								<Table.Cell class="min-w-20 text-sm font-bold text-foreground"
									>{formatPrice(market.price)}</Table.Cell
								>
								<Table.Cell>
									<Button size="lg" href={market.url}>Purchase now</Button>
								</Table.Cell>
							</Table.Row>
						{/each}
					</Table.Body>
				</Table.Root>
			</Sheet.Description>
		</Sheet.Header>
		<Sheet.Footer class="bg-warning-subtle text-warning-foreground">
			<div class="flex gap-2">
				<CircleAlert />
				<p>
					Prices are illustrative market snapshots for product research, not live checkout quotes.
					Always confirm the final total at the marketplace.
				</p>
			</div>
		</Sheet.Footer>
	</Sheet.Content>
</Sheet.Root>
