<script lang="ts">
	import './layout.css';
	// import favicon from '$lib/assets/favicon.svg';
	import stride from '$lib/assets/stride-s.svg';
	import Header from '$lib/components/NavigationHeader.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { afterNavigate } from '$app/navigation';

	afterNavigate(({ to }) => {
		if (!import.meta.env.PROD) return;
		if (!window.gtag) return;

		window.gtag('event', 'page_view', {
			page_title: document.title,
			page_location: window.location.href,
			page_path: to?.url.pathname ?? '/'
		});
	});

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={stride} /></svelte:head>

<Header />

{@render children()}

<Footer />
