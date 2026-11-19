<script lang="ts" module>
	import { afterNavigate } from '$app/navigation';

	declare global {
		interface Window {
			gtag: (command: string, action: string, params?: Record<string, unknown>) => void;
		}
	}

	afterNavigate(({ to }) => {
		if (!import.meta.env.PROD || !window.gtag) return;

		window.gtag('event', 'page_view', {
			page_title: document.title,
			page_location: window.location.href,
			page_path: to?.url.pathname
		});
	});
</script>
