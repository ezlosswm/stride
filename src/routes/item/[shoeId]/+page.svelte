<script lang="ts">
	import { ArrowLeft, FilePenLine } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Carousel from '$lib/components/ui/carousel/index.js';

	import { formatPrice } from '$lib';

	let { data, params } = $props();
	const shoeId = $derived(params.shoeId);

	const shoeInfo = $derived(data.product.data);

	// const user = $derived(data.user.user_metadata.name);
</script>

<h1>Single Item</h1>

<!-- <p>Slugs Shoe ID: {shoeId} for user {user}</p> -->

<!-- {#if data.user}
	<Button href="/auth/logout" variant="destructive">Logout</Button>
{:else}
	<Button href="/auth/login">Login</Button>
{/if} -->

<main>
	<div class="mb-9">
		<Button class="gap-1.5 text-muted-foreground" variant="ghost" href="/">
			<ArrowLeft />
			Back to Collections
		</Button>
	</div>

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
				<Card.Title class="text-lg font-bold">
					<h2>
						{shoeInfo.title}
					</h2>
				</Card.Title>
				<Card.Description>
					{shoeInfo.brand}
				</Card.Description>
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

				<div class="my-5 flex w-full items-center gap-2 p-2 md:flex-row md:justify-around">
					<Button
						href={shoeInfo.link}
						class="flex-1"
						size="lg"
						target="_blank"
						rel="noopener noreferrer">Buy Now For {formatPrice(shoeInfo.min_price)}</Button
					>
				</div>

				<section>
					<div class="mb-5">
						<h4 class="flex gap-1.5 text-base font-medium">
							<FilePenLine class="text-primary" />
							About this sneaker
						</h4>
					</div>
					<p>
						{@html shoeInfo.description}
					</p>
				</section>
			</Card.Content>
		</div>
	</Card.Root>
</main>
