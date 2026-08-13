<script lang="ts">
	import { ArrowLeft, Crosshair, FilePenLine, Mail } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import * as Drawer from '$lib/components/ui/drawer/index.js';

	import { formatPrice } from '$lib';

	let { data, params } = $props();
	const shoeId = $derived(params.shoeId);

	const shoeInfo = $derived(data.product.data);

	let isDrawerOpen = $state(false);

	const user = $derived(data.user.user_metadata.name);
</script>

<h1>Single Item</h1>

<p>Slugs Shoe ID: {shoeId} for user {user}</p>

{#if data.user}
	<Button href="/auth/logout" variant="destructive">Logout</Button>
{:else}
	<Button href="/auth/login">Login</Button>
{/if}

<main>
	<div class="my-9">
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
					<Drawer.Root bind:open={isDrawerOpen} direction="right">
						<Drawer.Trigger>
							{#snippet child({ props })}
								<Button {...props} class="flex-1 gap-1.5 text-primary" size="lg" variant="ghost">
									<Crosshair />
									Set Target Price
								</Button>
							{/snippet}
						</Drawer.Trigger>
						<Drawer.Content>
							<Drawer.Header>
								<Drawer.Title class="text-xl font-bold">
									<h2>Set Target Price</h2>
								</Drawer.Title>

								<Drawer.Description class="text-sm">
									We'll notify you when the price drops to or below your target.
								</Drawer.Description>
							</Drawer.Header>

							<section class="h-full space-y-5 px-8">
								<Card.Root class="grid grid-cols-[auto_1fr] items-center gap-3 p-3">
									<img
										src={shoeInfo.image}
										alt={shoeInfo.title}
										class="size-16 rounded-lg object-contain"
									/>

									<div class="space-y-0.5">
										<Card.Title class="text-base font-semibold">
											{shoeInfo.title}
										</Card.Title>
										<Card.Description class="text-sm text-muted-foreground">
											{shoeInfo.brand}
										</Card.Description>
									</div>
								</Card.Root>

								<form
									method="POST"
									id="set-price-form"
									class="flex h-full flex-1 flex-col space-y-5"
								>
									<div class="space-y-3">
										<Label class="text-sm tracking-tight">Target Price</Label>
										<div class="relative">
											<span
												class="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-base text-muted-foreground"
											>
												$
											</span>
											<Input type="number" placeholder="100.00" class="pl-7" />
										</div>
									</div>

									<div>
										<h4 class="mb-3 text-sm font-medium tracking-tight">Notify me via</h4>
										<div class="flex items-center justify-between gap-4 border p-4">
											<div class="flex items-center gap-4">
												<Mail class="text-muted-foreground" />
												<Label for="email-notification" class="grid text-sm">
													<div>
														<p>Email</p>
														<p class="font-normal text-muted-foreground">youremail@example.com</p>
													</div>
												</Label>
											</div>
											<Checkbox id="email-notification" />
										</div>
										<div class="flex items-center justify-between gap-4 border border-t-0 p-4">
											<div class="flex items-center gap-4">
												<Mail class="text-muted-foreground" />
												<Label for="push-notification" class="grid text-sm">
													<div>
														<p>Push Notification</p>
														<p class="font-normal text-muted-foreground">In-app notification</p>
													</div>
												</Label>
											</div>
											<Checkbox id="push-notification" />
										</div>
									</div>
								</form>
							</section>
							<Drawer.Footer>
								<Button type="submit" form="set-price-form" size="lg" class="w-full text-sm"
									>Save Target Price</Button
								>
								<Button
									onclick={() => (isDrawerOpen = false)}
									size="lg"
									variant="ghost"
									class="w-full text-sm">Cancel</Button
								>
							</Drawer.Footer>
						</Drawer.Content>
					</Drawer.Root>
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
