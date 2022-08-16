<script lang="ts">
	import Home from '/src/routes/Home.svelte';
	import CircleToy from '/src/routes/CircleIntersect.svelte';

	$: component = getComponent(window.location.pathname);

	function getComponent(path) {
		switch (path) {
			case '/circle-intersect':
				return CircleToy;

			default:
				return Home;
		}
	}
</script>

<main>
	<svelte:component this={component} />
</main>
