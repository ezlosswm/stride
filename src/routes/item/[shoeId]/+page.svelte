<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import * as Drawer from '$lib/components/ui/drawer/index.js';

	import { formatPrice } from '$lib';

	let { data, params } = $props();
	const shoeId = $derived(params.shoeId);

	const shoeInfo = $derived(data.product.data);
</script>

<h1>Single Item</h1>

<p>Slugs Shoe ID: {shoeId}</p>

<Card.Root class="mx-auto grid max-w-6xl grid-cols-1 md:w-3xl lg:grid-cols-2">
	<Carousel.Root>
		<Carousel.Content>
			{#each shoeInfo.gallery_360 as src}
				<Carousel.Item>
					<img {src} alt={shoeInfo.title} />
				</Carousel.Item>
			{/each}
		</Carousel.Content>
	</Carousel.Root>

	<div class="grid">
		<Card.Header class="row-span-1">
			<Card.Title>{shoeInfo.brand}</Card.Title>
			<Card.Description>{shoeInfo.title}</Card.Description>
		</Card.Header>
		<Card.Content class="row-span-auto space-y-5">
			<div class="my-3 flex w-full justify-around">
				<div>
					<p class="font-medium text-muted-foreground">Lowest Price</p>
					<p>
						{formatPrice(shoeInfo.min_price)}
					</p>
				</div>
				<div>
					<p class="font-medium text-muted-foreground">Average Price</p>
					<p>
						{formatPrice(shoeInfo.avg_price)}
					</p>
				</div>
				<div>
					<p class="font-medium text-muted-foreground">Highest Price</p>
					<p>
						{formatPrice(shoeInfo.max_price)}
					</p>
				</div>
			</div>

			<div
				class="my-5 flex w-full flex-col items-center gap-3 border p-3 md:flex-row md:justify-around"
			>
				<Button
					href={shoeInfo.link}
					class="w-full md:flex-1"
					size="lg"
					target="_blank"
					rel="noopener noreferrer">Buy Now For {formatPrice(shoeInfo.min_price)}</Button
				>
				<Drawer.Root direction="right">
					<Drawer.Trigger class="w-full md:flex-1">
						<Button class="w-full" size="lg" variant="ghost">Set Target Price</Button>
					</Drawer.Trigger>
					<Drawer.Content>
						<Drawer.Header>
							<Drawer.Title>Seh di word</Drawer.Title>

							<Drawer.Description>
								This is where one would set the price for the item: {shoeInfo.title}
							</Drawer.Description>
						</Drawer.Header>
					</Drawer.Content>
				</Drawer.Root>
			</div>

			<section>
				<p>
					{@html shoeInfo.description}
				</p>
			</section>
		</Card.Content>
	</div>
</Card.Root>
