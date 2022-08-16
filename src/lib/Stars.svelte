<script context="module" lang="ts">
	type Position = {
		x: number;
		y: number;
	};

	type Star = Position & {
		size: number;
	};
</script>


<script lang="ts">
	export let small = 0;
	export let medium = 0;
	export let large = 0;


	$: stars = [
		...generateStars(small, 0),
		...generateStars(medium, 1),
		...generateStars(large, 2),
	];


	function generateStars(count: number, size: number): Star[] {
		function createStar() {
			return {...randomPosition(), size};
		}

		return generateArray(count, createStar);
	}

	function randomPosition(): Position {
		return {
			x: randomInt(0, window.innerWidth),
			y: randomInt(0, window.innerHeight),
		};
	}

	/**
	 * @param min inclusive
	 * @param max exclusive
	 */
	export function randomInt(min: number, max: number): number {
		return Math.floor(min + Math.random() * (max - min));
	}

	function generateArray<T>(size: number, fn: (index: number) => T): T[] {
		const a = new Array(size);
		for (let i = 0; i < size; ++i) {
			a[i] = fn(i);
		}
		return a;
	}
</script>


{#each stars as i}
	<div class="star star-{i.size}" style="top: {i.y}px; left: {i.x}px;"></div>
{/each}


<style>
	.star {
		position: fixed;
		z-index: -10;
		background-color: white;
		border-radius: 50%;
	}

	.star-0 {
		width: 1px;
		height: 1px;
		box-shadow: 0 0 3px 1px #fff;
	}

	.star-1 {
		width: 2px;
		height: 2px;
		box-shadow: 0 0 3px 1px #fff;
	}

	.star-2 {
		width: 2px;
		height: 2px;
		box-shadow: 0 0 5px 2px #fff;
	}
</style>
