<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Eye } from '@lucide/svelte';

	let { value = $bindable(''), placeholder = '•••••••••', ...restProps } = $props();

	let showPassword = $state(false);
	function viewPassword() {
		showPassword = !showPassword;
	}
</script>

<div class="relative">
	<Input bind:value type={showPassword ? 'text' : 'password'} {placeholder} {...restProps} />
	<Button
		type="button"
		variant="ghost"
		aria-label={showPassword ? 'Hide password' : 'Show password'}
		onclick={viewPassword}
		class="absolute top-1/2 right-3 -translate-y-1/2"
	>
		<Eye />
	</Button>
</div>
