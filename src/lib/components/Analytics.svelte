<script lang="ts">
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
</script>
