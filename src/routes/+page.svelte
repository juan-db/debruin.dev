<script lang="ts">
	import {onMount} from 'svelte';
	import Stars from '$lib/Stars.svelte';

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

<!-- container div so we can easily hide the stars elements in dev tools -->
<div>
	<Stars small={stars.small} medium={stars.medium} large={stars.large} />
</div>

<div class="body-container">
	<h1 style="text-align: center">Hi! I'm Juan.</h1>

	<h4 class="section-heading">
		<span>About me</span>
	</h4>
	<p>
		I'm a senior full-stack software developer based in South Africa. I am
		experienced with the Microsoft web tech stack, but with competency in
		plenty of languages and tech stacks, including <strong>Go</strong>,
		<strong>Kotlin</strong>, <strong>C</strong>, and <strong>V</strong>.
	</p>

	<p>
		I am passionate about open-source software and code quality
		(performance, simplicity, maintainability, documentation, etc.)
	</p>

	<h4 class="section-heading">
		<span>Work</span>
	</h4>
	<p>
		I am currently looking for job opportunities in <strong>Europe</strong>,
		<strong>Canada</strong>, <strong>Japan</strong>, or
		<strong>South Korea</strong>. I am open to any web dev roles, except
		specialized DevOps positions. I would love if the role allowed me to use
		Svelte(Kit).
	</p>

	<h4 class="section-heading">
		<span>Contact</span>
	</h4>
	<p>
		<!-- without the html directive svelte will remove the comments -->
		<!-- how meta, I need comments to explain comments -->
		{@html '<!-- sorry for no mailto, bots and all -->'}
		I can be reached at
		<!-- email address obfuscated with css to prevent bots. -->
		<span class="no-spam">ju<invisible>notme</invisible>an@debruin<invisible>.void</invisible>.dev</span>.
		I'm also on <a href="https://github.com/juan-db">GitHub</a> (along with
		the <a href="https://www.github.com/juan-db/debruin.dev">source</a> for
		this website) and <a href="https://www.linkedin.com/in/juan-de-bruin/">LinkedIn</a>.
	</p>

	<h4 class="section-heading">
		<span>Thanks</span>
	</h4>
	<p>
		There's also a little <a href="/circle-intersect">circle intersection toy</a>
		on this website if you want to check that out.
	</p>

	<p>Thanks for stopping by. <span style="margin-left: 0.4rem;">:-)</span></p>
</div>

<style>
	.body-container {
		max-width: 660px;

		border: solid #444 1px;
		border-radius: 8px;

		/* We need a solid background to cover stars that overlap
		 * with the text. */
		background-color: #333;
		padding: 0 26px;

		margin: 0 auto;
	}

	.section-heading {
		margin-bottom: 0.5rem;
	}

	.section-heading > span {
		padding: 0 1rem;
		border-bottom: 1px solid white;
	}

	.section-heading + p {
		margin-top: 0;
	}

	/* hopefully this works, based on:
	 * https://spencermortensen.com/articles/email-obfuscation/#text-display */
	.no-spam invisible {
		display: none;
	}
</style>
