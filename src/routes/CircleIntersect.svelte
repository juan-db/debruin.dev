<script>
	// https://bugfree.dk/blog/2018/09/01/ray-tracing-computing-ray-circle-intersections

	import {onMount} from "svelte";

	import NumberWithSlider from "/src/lib/NumberWithSlider.svelte";
	import {strokeCircle, strokeLine, strokeLineSegment, clear} from '/src/lib/circle-intersect/drawing.js';
	import {getLineIntersections, getRayIntersections, toRadians} from '/src/lib/circle-intersect/math.js'

	let mounted = false;

	// Line equation: y = mx + b.
	let m = 1;
	let b = 1;

	// Ray
	let x = 0;
	let y = 0;
	let d = 0;
	let mag = 125;

	// Circle equation: (x - p)^2 + (y - q)^2 = r^2.
	let r = 100;
	let p = 0;
	let q = 0;

	// Whether we should calculate line or ray intersections.
	// true = line intersections.
	// false = ray intersections.
	let lineEquation = true;

	// Whether to draw the x and y axes.
	let showAxes = false;

	$: {
		// @formatter:off
		// If any of the parameters have changed, redraw.
		m; b; x; y; d; mag; r; p; q; lineEquation; showAxes;
		// @formatter:on

		redraw();
	}

	let canvas;
	let parameters;
	let ctx;

	let theme = {
		clearColor: '#151515',
		textColor: '#E6F4F1',
		lineColor: '#F2C57C',
		circleColor: '#7FB685',
		axesColor: '#444',
		intersectionColor: '#BF3F3C'
	};

	onMount(() => {
		ctx = canvas.getContext('2d');

		// Apply transformations to:
		// - put (0, 0) at the center of the canvas,
		// - make up positive y, and
		// - make right positive x.

		// Set the origin (0, 0) to the center of the canvas.
		ctx.translate(canvas.width / 2, canvas.height / 2);
		// Flip the canvas horizontally.
		ctx.scale(1.4, -1.4);

		mounted = true;

		redraw();
	});


	// - Clears the screen with the clear color,
	// - draws a circle at (0, 0) with radius _r_,
	// - draws a line across the canvas based on _m_ and _b_, and
	// - calculates and draws the intersections of the line with the circle.
	function redraw() {
		if (!mounted) {
			return;
		}

		ctx.lineWidth = 2;
		clear(ctx, theme.clearColor);

		if (showAxes) {
			ctx.strokeStyle = theme.axesColor;
			strokeLineSegment(ctx, [-canvas.width / 2, 0], [canvas.width / 2, 0]);
			strokeLineSegment(ctx, [0, -canvas.height / 2], [0, canvas.height / 2]);
		}

		ctx.strokeStyle = theme.circleColor;
		strokeCircle(ctx, p, q, r);

		ctx.strokeStyle = theme.lineColor;
		if (lineEquation) {
			strokeLine(ctx, m, b);
		} else {
			const angle = toRadians(d);
			const x2 = x + Math.cos(angle) * mag;
			const y2 = y + Math.sin(angle) * mag;
			strokeLineSegment(ctx, [x, y], [x2, y2]);
		}

		ctx.strokeStyle = theme.intersectionColor;
		ctx.lineWidth = 6;
		const intersections = lineEquation
			? getLineIntersections(m, b, r, p, q)
			: getRayIntersections(x, y, toRadians(d), mag, r, p, q);
		for (const i of intersections) {
			strokeCircle(ctx, ...i, 3);
		}
		ctx.lineWidth = 2;
	}
</script>

<svelte:head>
	<title>Intersection toy - Juan de Bruin</title>
</svelte:head>

<div class="flex-container">
	<div class="root-container">
		<canvas id="circle-line" width="600" height="600" bind:this={canvas}>
			Not supported.
		</canvas>

		<form id="parameters" bind:this={parameters}>
			<div class="form-section">
				<fieldset style="text-align: start;">
					<legend>Which line type do you want?</legend>

					<span class="radio-container">
						<input id="line-line-type" type="radio" name="line-type" bind:group={lineEquation} value={true}>
						<label for="line-line-type">Line</label>
					</span>

					<span class="radio-container">
						<input id="ray-line-type" type="radio" name="line-type" bind:group={lineEquation} value={false}>
						<label for="ray-line-type">Ray</label>
					</span>
				</fieldset>
			</div>

			{#if lineEquation === true}
				<div class="form-section">
					<div class="section-header-container">
						<h4 class="section-header">Line equation</h4>:
						<span>y = <i>m</i>x + <i>b</i></span>
					</div>

					<NumberWithSlider legend="m (line slope)" name="m" numberAttrs={{step: 0.1, min: -999, max: 999}}
						sliderAttrs={{step: 0.1, min: -10, max: 10}} bind:value={m}/>

					<NumberWithSlider legend="b (line y-intercept)" name="b"
						numberAttrs={{step: 1, min: -999, max: 999}}
						sliderAttrs={{step: 1, min: -250, max: 250}} bind:value={b}/>
				</div>
			{:else}
				<div class="form-section">
					<div class="section-header-container">
						<h4 class="section-header">Ray properties</h4>
					</div>

					<NumberWithSlider legend="x" name="x" numberAttrs={{step: 1, min: -250, max: 250}}
						sliderAttrs={{step: 1, min: -250, max: 250}} bind:value={x}/>

					<NumberWithSlider legend="y" name="y" numberAttrs={{step: 1, min: -250, max: 250}}
						sliderAttrs={{step: 1, min: -250, max: 250}} bind:value={y}/>

					<NumberWithSlider legend="angle" name="d" numberAttrs={{step: 1, min: 0, max: 360}}
						sliderAttrs={{step: 1, min: 0, max: 360}} bind:value={d}/>

					<NumberWithSlider legend="magnitude" name="mag" numberAttrs={{step: 1, min: 10, max: 500}}
						sliderAttrs={{step: 1, min: 10, max: 500}} bind:value={mag}/>
				</div>
			{/if}

			<div class="form-section">
				<div class="section-header-container">
					<h4 class="section-header">Circle equation</h4>:
					<span>(x - <i>p</i>)<sup>2</sup> + (y - <i>q</i>)<sup>2</sup> = <i>r</i><sup>2</sup></span>
				</div>

				<NumberWithSlider legend="r (circle radius)" name="r" numberAttrs={{step: 1, max: 250, min: 0}}
					sliderAttrs={{step: 1, max: 250, min: 0}} bind:value={r}/>

				<NumberWithSlider legend="p (circle X offset)" name="p" numberAttrs={{step: 1, max: 250, min: -250}}
					sliderAttrs={{step: 1, max: 250, min: -250}} bind:value={p}/>

				<NumberWithSlider legend="q (circle Y offset)" name="q" numberAttrs={{step: 1, max: 250, min: -250}}
					sliderAttrs={{step: 1, max: 250, min: -250}} bind:value={q}/>
			</div>

			<div class="input-container" style="text-align: start;">
				<label for="show-axes">Show axes</label>
				<input id="show-axes" name="show-axes" type="checkbox" bind:checked={showAxes}>
			</div>
		</form>
	</div>
</div>

<style>
	.root-container {
		max-width: 600px;

		display: flex;
		flex-direction: column;
	}

	canvas#circle-line {
		max-width: 600px;
		max-height: 600px;

		width: 100%;
		height: auto;

		margin-bottom: 26px;
	}

	@media (min-width: 1080px) {
		.root-container {
			max-width: 1130px;
			min-width: 1130px;

			flex-direction: row;
			justify-content: space-between;

			box-sizing: border-box;
			padding: 0 0.8em;
		}

		canvas#circle-line {
			margin-bottom: 0;
		}
	}

	form#parameters {
		max-width: 600px;
		width: 100%;
	}

	.form-section {
		margin-bottom: 14px;
	}

	.section-header-container {
		margin-bottom: 6px;
	}

	.section-header {
		display: inline;
	}

	.radio-container {
		display: inline-flex;
		align-items: center;
		margin-right: 12px;
	}

	.radio-container input[type="radio"] {
		margin: 0 6px 0 0;
	}

	/* Most of the inputs are contained in fieldsets, which have 12px of padding built
	 * in. This class is for inputs that aren't in fieldsets so that the padding is
	 * consistent. Alternatively, I could remove left padding from fieldsets and apply
	 * this class to all inputs, but for the moment this is fine. */
	.input-container {
		padding-left: 12px;
	}
</style>
