<script lang="ts">
	import { ChartColumn, ShieldCheck, Sparkles } from '@lucide/svelte';
</script>

<section id="how-it-works" class="border-y bg-muted py-16">
	<div class="mx-auto w-full max-w-7xl px-4">
		<div class="flex flex-col items-start gap-4 md:flex-row">
			<div class="mb-5 w-3/4">
				<div class="mb-5 flex w-full items-center gap-1.5">
					<div
						class="size-2 animate-pulse rounded-full bg-accent shadow-[0_0_30px_5px] shadow-accent/70"
					></div>
					<span class="text-xs font-medium tracking-wide text-muted-foreground uppercase"
						>Cheaper prices, plain and simple</span
					>
				</div>

				<h2 class="font-heading text-4xl font-bold tracking-tighter">
					Less tab-switching.<br />More certainty.
				</h2>
			</div>

			<div class="mt-3 flex w-full flex-col gap-4 md:mt-0 md:flex-row">
				<div class="flex w-full flex-col rounded-xl border bg-white p-6">
					<ChartColumn />

					<div class="mt-7 space-y-1.5">
						<h4 class="text-sm font-semibold tracking-tight">See both markets</h4>
						<p class="text-xs text-muted-foreground">
							StockX and GOAT, side by side, with the same size selected.
						</p>
					</div>
				</div>

				<div class="flex w-full flex-col rounded-xl border bg-white p-4">
					<Sparkles />

					<div class="mt-7 space-y-1.5">
						<h4 class="text-sm font-semibold tracking-tight">Spot the lead</h4>
						<p class="text-xs text-muted-foreground">The best current ask, not a wall of charts.</p>
					</div>
				</div>

				<div class="flex w-full flex-col rounded-xl border bg-white p-4">
					<ShieldCheck />

					<div class="mt-7 space-y-1.5">
						<h4 class="text-sm font-semibold tracking-tight">Know the caveat</h4>
						<p class="text-xs text-muted-foreground">
							Data is labeled clearly, so your deision stays grounded.
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
