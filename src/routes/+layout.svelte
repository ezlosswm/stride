<script lang="ts">
	import './layout.css';
	// import favicon from '$lib/assets/favicon.svg';
	import stride from '$lib/assets/stride-s.svg';
	import Header from '$lib/components/NavigationHeader.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Analytics from '$lib/components/Analytics.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={stride} /></svelte:head>

<Analytics />

<Header />

{@render children()}

<Footer />
