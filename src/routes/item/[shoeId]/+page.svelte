<script lang="ts">
	let { params } = $props();
	const shoeId = $derived(params.shoeId);
</script>

<h1>Single Item</h1>

<p>Shoe ID: {shoeId}</p>
