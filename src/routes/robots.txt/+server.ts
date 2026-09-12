export function GET() {
	return new Response(
		`User-agent: *
Allow: /

Sitemap: https://stride-seven-beta.vercel.app/sitemap.xml`,
		{
			headers: {
				'Content-Type': 'text/plain'
			}
		}
	);
}
