<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import PasswordInput from '$lib/components/ui/PasswordInput.svelte';

	let showPassword = $state(false);
	function viewPassword(e: Event) {
		showPassword = !showPassword;
	}
</script>

<form>
	<div class="space-y-3">
		<div class="flex gap-4">
			<div class="flex flex-col gap-2">
				<Label>First Name</Label>
				<Input type="text" placeholder="Carlos" />
			</div>

			<div class="flex flex-col gap-2">
				<Label>Last Name</Label>
				<Input type="text" placeholder="Gomez" />
			</div>
		</div>

		<div class="flex flex-col gap-2">
			<Label>Email</Label>
			<Input type="email" placeholder="example@stride.com" />
		</div>

		<div class="flex flex-col gap-2">
			<Label>Password</Label>
			<PasswordInput placeholder="•••••••••" />
		</div>

		<div class="flex flex-col gap-2">
			<Label>Confirm your password</Label>
			<PasswordInput placeholder="•••••••••" />
		</div>

		<div class="mt-7">
			<Button size="lg" class="w-full">Submit</Button>
		</div>
	</div>
</form>
