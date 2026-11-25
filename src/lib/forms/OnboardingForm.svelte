<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import { onboardingFormSchema } from '$lib/schemas/onboarding';
	import { defaults, superForm } from 'sveltekit-superforms';
	import { zod4 } from 'sveltekit-superforms/adapters';
	import { sizeCategories } from '$lib/constants/sizeCategories';
	import Label from '$lib/components/ui/label/label.svelte';
	import { Button } from '$lib/components/ui/button';
	import { shoeSizes } from '$lib/constants/shoeSizes';

	const form = superForm(defaults(zod4(onboardingFormSchema)), {
		validators: zod4(onboardingFormSchema)
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance>
	<div class="space-y-3">
		<Form.Fieldset class="flex flex-col" {form} name="sizeCategory">
			<Form.Legend>Select sizing category</Form.Legend>

			<RadioGroup.Root
				bind:value={$formData.sizeCategory}
				class="grid grid-cols-3 gap-3"
				name="sizeCategory"
			>
				{#each sizeCategories as category}
					<Form.Control>
						{#snippet children({ props })}
							<div class="border border-border p-3">
								<div class="flex flex-col place-content-center gap-2">
									<div class="flex flex-1 justify-between">
										<Form.Label class="text-sm font-medium">{category.label}</Form.Label>
										<RadioGroup.Item
											{...props}
											value={category.value}
											class="size-4 shrink-0 border border-input text-primary data-[state=checked]:border-primary"
										/>
									</div>
									<p class="text-muted-foreground">{category.description}</p>
								</div>
							</div>
						{/snippet}
					</Form.Control>
				{/each}
			</RadioGroup.Root>

			<Form.FieldErrors />
		</Form.Fieldset>

		<Form.Fieldset class="flex flex-col" {form} name="shoeSize">
			<div class="flex justify-between">
				<Form.Legend>Select your US shoe size</Form.Legend>
				<p class="tracking-widest text-primary">M {$formData.shoeSize}</p>
			</div>
			<RadioGroup.Root bind:value={$formData.shoeSize} class="grid grid-cols-6" name="shoeSize">
				{#each shoeSizes as shoeSize}
					<Form.Control>
						{#snippet children({ props })}
							<div
								class="rounded-lg border border-border transition-colors duration-100 ease-in hover:border-primary has-data-[state=checked]:bg-primary/80 has-data-[state=checked]:text-background"
							>
								<div class="flex place-content-center">
									<RadioGroup.Item class="peer sr-only" {...props} value={shoeSize} />
									<Form.Label class="block w-full cursor-pointer p-3">{shoeSize}</Form.Label>
								</div>
							</div>
						{/snippet}
					</Form.Control>
				{/each}
			</RadioGroup.Root>
			<Form.FieldErrors />
		</Form.Fieldset>

		<Button type="submit">Submit</Button>
	</div>
</form>
