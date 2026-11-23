<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Eye, EyeOff } from '@lucide/svelte';

	let { value = $bindable(''), placeholder = '•••••••••', ...restProps } = $props();

	let showPassword = $state(false);
</script>

<div class="relative">
	<Input {...restProps} bind:value type={showPassword ? 'text' : 'password'} {placeholder} />

	<Button
		type="button"
		variant="ghost"
		size="icon"
		aria-label={showPassword ? 'Hide password' : 'Show password'}
		onclick={() => (showPassword = !showPassword)}
		class="absolute top-1/2 right-3 -translate-y-1/2"
	>
		{#if showPassword}
			<EyeOff />
		{:else}
			<Eye />
		{/if}
	</Button>
</div>
