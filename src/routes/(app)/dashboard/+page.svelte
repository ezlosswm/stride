<script lang="ts">
	import type { PageData } from './$types';
	const { data }: { data: PageData } = $props();
</script>

<main class="relative mt-20 min-h-screen">
	<h1 class="text-xl">Dashboard</h1>

	<h2>User Profile</h2>
	<div class="text-muted-foreground">
		<p>
			{data.sampleProfile.gender}
		</p>
		<p>
			{data.sampleProfile.shoeSize}
		</p>
	</div>
</main>
