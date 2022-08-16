<script lang="ts">
	import Home from '/src/routes/Home.svelte';
	import CircleToy from '/src/routes/CircleIntersect.svelte';
	import {onMount} from 'svelte';

	let component = Home;

	onMount(() => {
		updateComponent();
	});

	function handleHashChange(e: HashChangeEvent) {
		updateComponent();
	}

	function updateComponent() {
		component = window.location.hash === '#circle-intersect' ? CircleToy : Home;
	}
</script>

<svelte:window on:hashchange={handleHashChange} />

<main>
	<svelte:component this={component} />
</main>
