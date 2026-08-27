<script lang="ts">
	import nike from '$lib/assets/nike-gt-cut-4.avif';
	import { Check, ChevronDown } from '@lucide/svelte';

	import { Button } from '$lib/components/ui/button/index';
</script>

<main class="relative isolate overflow-hidden border-b">
	<div
		aria-hidden="true"
		class="pointer-events-none absolute inset-0 -z-10
			bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)]
			mask-[linear-gradient(to_bottom,black_75%,transparent_100%)]
			bg-size-[40px_40px]"
	></div>

	<!-- Circle & accent glow -->
	<div
		aria-hidden="true"
		class="pointer-events-none absolute top-0 right-0 -z-10
			size-144 translate-x-1/3 -translate-y-1/4
			rounded-full bg-accent/10 blur-3xl"
	></div>

	<div
		aria-hidden="true"
		class="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full overflow-hidden"
	>
		<div
			class="absolute top-24 right-0 size-48 translate-x-1/2 rounded-full border border-accent/50 shadow-[0px_0px_50px_50px] shadow-accent/16 md:top-52 md:size-96"
		>
			<div class="absolute inset-1/2 size-32 -translate-1/2 rounded-full border md:size-48"></div>
		</div>
	</div>

	<div class="mx-auto w-full max-w-7xl px-4 pt-16">
		<div class="grid grid-cols-1 grid-rows-[1fr_auto] gap-4 md:grid-cols-2 md:items-end">
			<div class="col-start-1 row-start-1 flex flex-col gap-8 self-center py-8">
				<div class="flex items-center gap-1.5">
					<div
						class="size-2 animate-pulse rounded-full bg-accent shadow-[0_0_30px_5px] shadow-accent/70"
					></div>
					<span class="text-xs font-medium tracking-wider text-muted-foreground uppercase"
						>THE SMARTER WAY TO BUY SNEAKERS</span
					>
				</div>

				<div>
					<h1 class="font-heading text-5xl font-bold tracking-tight md:text-7xl">
						<span> One pair. </span>
						<br />
						<span class="text-muted-foreground">Two markets.</span>
						<br />
						<span> One clear choice. </span>
					</h1>
					<p class="mt-7">
						STRIDE compares sneaker prices across StockX and GOAT, so you can quickly see where to
						buy, what you'll pay, and when the price is right.
					</p>
				</div>

				<Button href="/#collections" class=" h-10 w-fit rounded-full px-6 py-3 font-bold" size="lg"
					>Start Comparing <span><ChevronDown /></span></Button
				>
			</div>

			<div class="relative col-start-2 row-start-1 hidden md:block">
				<div class="flex items-end gap-8">
					<div class="max-w-40 space-y-1 rounded-3xl bg-foreground p-4 text-background">
						<div class="flex items-center gap-1.5">
							<div
								class="size-2 animate-pulse rounded-full bg-accent shadow-[0_0_30px_5px] shadow-accent/70"
							></div>
							<span
								class="font-font-heading text-xs font-medium tracking-wider text-muted uppercase"
								>StockX leads</span
							>
						</div>

						<p class="font-heading font-bold">by $8</p>
					</div>

					<article
						class="relative max-w-96 -translate-y-1 rotate-5 rounded-xl border bg-card p-4 shadow-lg/10"
					>
						<div class="absolute top-4 left-4">
							<div class="rounded-full bg-muted px-3 py-1 text-muted-foreground">
								<p class="font-heading text-xs font-bold">Nike</p>
							</div>
						</div>
						<div class="flex h-full flex-col items-center">
							<img
								class="max-h-full max-w-full object-contain"
								src={nike}
								alt="Nike Air Zoom GT Cut 4"
							/>

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
									<p class="mt-1 font-heading text-xs tracking-tight text-muted-foreground">
										best ask
									</p>
								</div>
							</div>
						</div>
					</article>
				</div>
			</div>

			<!-- Features -->
			<div class="col-span-full row-start-2 w-full border-t py-8 md:mt-16">
				<div class="flex w-full gap-4">
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
		</div>
	</div>
</main>
