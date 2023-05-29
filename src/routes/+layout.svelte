<script lang="ts">
	import '../app.css';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data;

	$: ({ supabase, session } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<svelte:head>
	<title>User Management</title>
</svelte:head>

<div class="container" style="padding: 50px 0 100px 0">
	<slot />
</div>
<footer>
	<p style="color: white">This staging environment was deployed from {data.commitRef}.</p>
</footer>
