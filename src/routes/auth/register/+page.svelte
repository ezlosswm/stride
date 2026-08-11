<script>
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Form from '$lib/components/ui/form/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
</script>

<h1>Let's get started</h1>

<Card.Root>
	<Card.Header>
		<Card.Title>Welcome to Stride</Card.Title>
		<Card.Description>Enter your email address to Sign Up or Log In</Card.Description>
	</Card.Header>

	<form>
		<div>
			<Label>Enter your email address</Label>
			<Input placeholder="Email Adress *" />
		</div>
	</form>

	<Card.Footer>
		<Button>Sign up with Google</Button>
	</Card.Footer>
</Card.Root>
