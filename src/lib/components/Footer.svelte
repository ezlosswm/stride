<script>
	import logo from '$lib/assets/stride-logo.svg';
	import { Button } from '$lib/components/ui/button/index';

	const dateObj = new Date();
	const year = dateObj.getFullYear().toString();
</script>

<footer
	class=" mt-8 flex w-full flex-col items-center justify-between gap-9 border bg-muted px-6 py-4 md:flex-row"
>
	<Button class="size-32" variant="secondary" href="/">
		<img src={logo} class="h-full object-contain" alt="Stride Logo" />
	</Button>

	<p>Copyright &copy; {year} Stride</p>

	<div class="flex flex-col items-center gap-2 md:flex-row">
		<Button variant="link" class="text-muted-foreground">Privacy Policy</Button>
		<Button variant="link" class="text-muted-foreground">Terms & Conditions</Button>
		<Button variant="link" class="text-muted-foreground">Cookie Policy</Button>
		<Button variant="link" class="text-muted-foreground">Contact</Button>
	</div>
</footer>
