<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import {
		ArrowUpRight,
		Check,
		ChevronLeft,
		CircleAlert,
		Heart,
		Info,
		Share,
		ShieldAlert,
		TrendingUp
	} from '@lucide/svelte';
	import { formatPrice } from '$lib/index';
	import Separator from './ui/separator/separator.svelte';
	import Badge from './ui/badge/badge.svelte';

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

	const shoeSizes = [
		{
			size: 6,
			isActive: true
		},
		{
			size: 7,
			isActive: false
		},
		{
			size: 8,
			isActive: false
		},
		{
			size: 9,
			isActive: false
		},
		{
			size: 10,
			isActive: false
		},
		{
			size: 10.5,
			isActive: false
		},
		{
			size: 11,
			isActive: false
		}
	];
	// const collection = $derived(data.collection);
</script>

<!-- <Drawer.Root direction="right">
	<Drawer.Trigger
		class="flex h-7 cursor-pointer items-center gap-1 px-2 text-xs/relaxed text-primary"
	>
		<span class="font-medium"> Compare </span>
		<ArrowUpRight class="size-4 stroke-primary" />
	</Drawer.Trigger>

	<Drawer.Content class="mt-20 w-[calc(100dvw-1rem)]! md:max-w-2xl!">
		<Drawer.Header>
			<Drawer.Title class="mb-3">
				<div class="flex items-center justify-between">
					<Drawer.Close
						class="inline-flex items-center gap-1 text-xs/relaxed font-medium text-muted-foreground transition-colors hover:text-foreground"
					>
						<ChevronLeft class="size-4" />
						Back to all sneakers
					</Drawer.Close>

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
			</Drawer.Title>

			<Drawer.Description>
				<img
					src={collection.imageUrl}
					alt={collection.name}
					class="size-full max-h-52 rounded-xl border object-contain"
				/>

				<div class="mt-7">
					<div class="flex items-start justify-between">
						<div class="flex-1">
							<h2 class="font-heading text-xl/relaxed font-bold text-foreground">
								{collection.name}
							</h2>
							<p>{collection.colorway}</p>
						</div>
						<div class="shrink-0 rounded-full border bg-muted px-3 py-1">
							<p class="font-heading text-xs font-bold">{collection.brand}</p>
						</div>
					</div>

					<div class="mt-5 space-y-7">
						<div class="space-y-3">
							<h4 class="text-xs/relaxed font-medium text-foreground uppercase">
								Choose your size <span>US Men's</span>
							</h4>

							<div class="flex gap-2">
								{#each shoeSizes as shoeSize}
									<Button variant={shoeSize.isActive ? 'default' : 'outline'} class="size-10"
										>{shoeSize.size}</Button
									>
								{/each}
							</div>
						</div>

						<div class="flex items-end justify-between">
							<div>
								<h4 class="text-xs/relaxed font-medium text-foreground uppercase">
									Market Comparison
								</h4>

								<p class="text-xs text-muted-foreground">
									<span>Size 9</span> Lowest current ask
								</p>
							</div>

							<div class="flex items-center gap-1">
								<Info class="size-4" />
								<p class="font-bold">Fees shown separetely</p>
							</div>
						</div>

						<div class="rounded-xl border px-4">
							<div class="space-y-3 py-4">
								<div class="flex items-center justify-between gap-4">
									<div>
										<div class="flex items-center gap-4">
											<h3 class="text-base font-medium text-foreground">
												{collection.markets[0].marketplace}
											</h3>
											<Badge><Check />Best price</Badge>
										</div>

										<p class="font-heading text-lg/tight font-bold text-foreground">
											{formatPrice(getLowestPrice(collection.markets)?.price)}
										</p>
									</div>
									<Button variant="ghost" size="icon-lg" href="https://stockx.com/">
										<Share class="size-5" />
									</Button>
								</div>
							</div>
							{#if collection.markets[1]}
								<Separator />

								<div class="space-y-3 py-4">
									<div class="flex items-center justify-between gap-4">
										<div>
											<h3 class="text-base font-medium text-foreground">
												{collection.markets[1].marketplace}
											</h3>

											<p class="font-heading text-lg/tight font-bold text-foreground">
												{formatPrice(collection.markets[1]?.price)}
											</p>
										</div>

										<Button variant="ghost" size="icon-lg" href="https://www.goat.com/en-gb">
											<Share class="size-5" />
										</Button>
									</div>
								</div>
							{/if}
						</div>
					</div>
				</div>
			</Drawer.Description>
			<Drawer.Footer>
				<div class="mb-5 flex items-center justify-between gap-4">
					<Button class="h-10 w-1/2 flex-1 rounded-full text-sm">
						View on StockX
						<TrendingUp />
					</Button>

					<Button variant="outline" class="h-10 w-1/2 rounded-full text-sm">
						View on GOAT
						<TrendingUp />
					</Button>
				</div>

				<div class="rounded-xl bg-warning-subtle p-4 text-warning-foreground">
					<div class="flex items-start gap-2">
						<ShieldAlert class="size-5" />
						<p>
							Prices are illustrative market snapshots for product research, not live checkout
							quotes. Always confirm the final total at the marketplace.
						</p>
					</div>
				</div>
			</Drawer.Footer>
		</Drawer.Header>
	</Drawer.Content>
</Drawer.Root> -->

<Sheet.Root>
	<Sheet.Trigger class={buttonVariants({ variant: 'ghost' })}>
		<span class="font-medium text-primary"> Compare </span>
		<ArrowUpRight class="size-4 stroke-primary" />
	</Sheet.Trigger>

	<Sheet.Content side="right" class="z-90 max-w-xl!">
		<Sheet.Header>
			<Sheet.Title class="space-y-5">
				<Sheet.Close class="flex justify-between">
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

			<Sheet.Description class="mt-7 space-y-5">
				<h4 class="font-heading text-lg font-bold text-foreground">Price Comparison</h4>

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
						<Table.Row>
							<Table.Cell class="w-full">
								<span class="text-sm font-bold text-foreground">
									{collection.markets[0]?.marketplace}
								</span>
								<div class="mt-1">Lowest Ask</div>
							</Table.Cell>
							<Table.Cell class="min-w-20 text-sm font-bold text-foreground"
								>{formatPrice(collection.markets[0]?.price)}</Table.Cell
							>
							<Table.Cell>
								<Button size="lg">Purchase now</Button>
							</Table.Cell>
						</Table.Row>
						{#if collection.markets[1]}
							<Table.Row>
								<Table.Cell class="w-full">
									<span class="text-sm font-bold text-foreground">
										{collection.markets[1]?.marketplace}
									</span>
									<div class="mt-1">Lowest Ask</div>
								</Table.Cell>
								<Table.Cell class="min-w-20 text-sm font-bold text-foreground"
									>{formatPrice(collection.markets[1]?.price)}</Table.Cell
								>
								<Table.Cell>
									<Button size="lg">Purchase now</Button>
								</Table.Cell>
							</Table.Row>
						{/if}
					</Table.Body>
				</Table.Root>
			</Sheet.Description>
		</Sheet.Header>
		<Sheet.Footer>
			<Button href="item/{collection.sku}" class="py-6 text-base" variant="default" size="lg"
				>View Full Details</Button
			>
		</Sheet.Footer>
	</Sheet.Content>
</Sheet.Root>
