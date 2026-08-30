<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { filterTypes, sortTypes } from '$lib/filterAndSort.js';
	import Hero from '$lib/components/Hero.svelte';
	import HowItWorks from '$lib/components/HowItWorks.svelte';
	import Collections from '$lib/components/Collections.svelte';
	import { Search } from '@lucide/svelte';

	let { data } = $props();
	const collections = $derived(data.collections);

	let value = $state<string>('');
	const triggerContent = $derived(
		sortTypes.find((s) => s.value === value)?.label ?? 'Lowest Price'
	);
</script>

<Hero />

<div id="collections" class="border-t">
	<section
		class="mx-auto grid max-w-7xl grid-cols-1 gap-4 border-t px-4 py-16 md:grid-cols-2 lg:grid-cols-3"
	>
		<div class="col-span-full mb-8 space-y-3">
			<div class="mb-5 flex items-center gap-1.5">
				<div
					class="size-2 animate-pulse rounded-full bg-accent shadow-[0_0_30px_5px] shadow-accent/70"
				></div>
				<span class="text-xs font-medium tracking-wide text-muted-foreground uppercase"
					>Curated market board</span
				>
			</div>

			<h2 class="font-heading text-4xl font-bold">Find your next pair.</h2>

			<p class="font-heading text-sm text-muted-foreground">A list of pairs worth a closer look.</p>
			<div class="mt-7 space-y-5">
				<div class="relative">
					<Search class="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
					<Input
						class="rounded-full bg-white! p-6 pl-9 text-sm! focus:shadow-[0_0_20px_7px] focus:shadow-accent/20"
						placeholder="Search a sneaker, colorway or brand"
					/>
				</div>
				<div class="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
					<!-- Filter -->
					<div class="flex items-center gap-4">
						{#each filterTypes as filterType (filterType.label)}
							<Button
								variant={filterType.isActive ? 'default' : 'outline'}
								class="rounded-full p-4 transition hover:-translate-y-0.5"
								>{filterType.label}</Button
							>
						{/each}
					</div>

					<!-- Sort -->
					<div class="flex items-center gap-2">
						<p class="text-xs font-semibold text-muted-foreground">Sort</p>
						<Select.Root type="single" bind:value>
							<Select.Trigger>{triggerContent}</Select.Trigger>
							<Select.Content>
								<Select.Group>
									{#each sortTypes as sortType (sortType.value)}
										<Select.Item value={sortType.value} label={sortType.label}
											>{sortType.label}</Select.Item
										>
									{/each}
								</Select.Group>
							</Select.Content>
						</Select.Root>
					</div>
				</div>
			</div>
		</div>

		{#each collections as collection}
			<Collections {collection} />
		{/each}
	</section>
</div>

<HowItWorks />
