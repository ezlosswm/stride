<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import PasswordInput from '$lib/components/ui/PasswordInput.svelte';
	import { regitrationFormSchema } from '$lib/schemas/registration';
	import { zod4 } from 'sveltekit-superforms/adapters';
	import { defaults, superForm } from 'sveltekit-superforms';

	const form = superForm(defaults(zod4(regitrationFormSchema)), {
		validators: zod4(regitrationFormSchema)
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance>
	<div class="space-y-3">
		<Form.Field class="flex flex-col" {form} name="firstName">
			<Form.Control>
				{#snippet children({ props })}
					<div class="flex w-full flex-col gap-2">
						<Form.Label>First Name</Form.Label>
						<Input bind:value={$formData.firstName} {...props} type="text" placeholder="Carlos" />
					</div>
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field class="flex flex-col" {form} name="lastName">
			<Form.Control>
				{#snippet children({ props })}
					<div class="flex w-full flex-col gap-2">
						<Form.Label>Last Name</Form.Label>
						<Input bind:value={$formData.lastName} {...props} type="text" placeholder="Gomez" />
					</div>
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field class="flex flex-col" {form} name="email">
			<Form.Control>
				{#snippet children({ props })}
					<div class="flex w-full flex-col gap-2">
						<Form.Label>Email</Form.Label>
						<Input
							bind:value={$formData.email}
							{...props}
							type="email"
							placeholder="example@stride.com"
						/>
					</div>
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field class="flex flex-col" {form} name="password">
			<Form.Control>
				{#snippet children({ props })}
					<div class="flex flex-col gap-2">
						<Form.Label>Password</Form.Label>
						<PasswordInput
							bind:value={$formData.password}
							{...props}
							type="password"
							placeholder="•••••••••"
						/>
					</div>
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field class="flex flex-col" {form} name="confirmPassword">
			<Form.Control>
				{#snippet children({ props })}
					<div class="flex flex-col gap-2">
						<Form.Label>Password</Form.Label>
						<PasswordInput
							bind:value={$formData.confirmPassword}
							{...props}
							type="password"
							placeholder="•••••••••"
						/>
					</div>
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<div class="mt-7">
			<Button type="submit" size="lg" class="w-full">Submit</Button>
		</div>
	</div>
</form>
