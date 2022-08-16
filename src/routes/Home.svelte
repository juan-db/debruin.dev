<script lang="ts">
	import {onMount} from 'svelte';
	import Stars from '/src/lib/Stars.svelte';

	let stars = {};

	onMount(() => {
		stars = getStarCount();
	});

	function getStarCount() {
		const pixels = window.innerWidth * window.innerHeight;

		/**
		 * Returns 1 for every `r` pixels.
		 * Always rounds up.
		 *
		 * @example 4000 pixels.
		 * ratio(400) // 10
		 *
		 * @example 3900 pixels, rounds up.
		 * ratio(400) // 10
		 *
		 * @example 5 pixels.
		 * ratio(1) // 5
		 * ratio(2) // 3
		 * ratio(5) // 1
		 */
		function ratio(r: number): number {
			return Math.ceil(pixels / r);
		}

		return {
			small: ratio(35000),
			medium: ratio(110000),
			large: ratio(400000),
		};
	}
</script>

<svelte:head>
	<title>Juan de Bruin</title>
</svelte:head>

<!-- Container div so we can easily hide the stars elements in devtools. -->
<div>
	<Stars small={stars.small} medium={stars.medium} large={stars.large} />
</div>

<div class="body-container">
	<h1>Hi! I'm Juan.</h1>

	<p>
		I'm a senior full-stack software developer experienced with the Microsoft web
		tech stack, but with competency in plenty of languages and tech stacks,
		including Go, Java, Kotlin, and C.
	</p>

	<p>My interests include computers, television, music, and mountain biking.</p>

	<p>
		I'm available on <a href="https://github.com/juan-db">GitHub</a> (along with the
		<a href="https://www.github.com/juan-db/debruin.dev">source</a> for this website)
		and <a href="https://www.linkedin.com/in/juan-de-bruin/">LinkedIn</a>.
	</p>

	<p>
		There's also a little <a href="/circle-intersect">circle intersection toy</a> on
		this website if you want to check that out.
	</p>

	<p>Thanks for stopping by.</p>
</div>

<style>
	.body-container {
		max-width: 660px;

		border: solid #444 1px;
		border-radius: 8px;

		/* We need a solid background to cover stars that overlap with the text. */
		background-color: #333;
		padding: 0 26px;
	}
</style>
