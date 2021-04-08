/** Draw a circle at the specified coordinates. */
export function strokeCircle(ctx, x, y, radius) {
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, 2 * Math.PI);
	ctx.stroke();
}

/** Draws a line across the canvas based on the provided slope and y-intercept. */
export function strokeLine(ctx, m, b) {
	ctx.beginPath();

	// x = (y - b) / m
	// y = mx + b
	const offset = (() => {
		const transform = ctx.getTransform();
		return [transform.e, transform.f];
	})();
	if (m <= 1 && m >= -1) {
		// Run > rise, i.e. flatter line.
		ctx.moveTo(-offset[0], m * -offset[0] + b);
		ctx.lineTo(offset[0], m * offset[0] + b);
	} else {
		// Run < rise, i.e. steeper line.
		ctx.moveTo((-offset[1] - b) / m, -offset[1]);
		ctx.lineTo((offset[1] - b) / m, offset[1]);
	}

	ctx.stroke();
}

/** Draws a line segment from point a to point b. */
export function strokeLineSegment(ctx, a, b) {
	ctx.beginPath();

	ctx.moveTo(a[0], a[1]);
	ctx.lineTo(b[0], b[1]);

	ctx.stroke();
}

/** Clears the screen with the specified color. */
export function clear(ctx, color) {
	const { width: w, height: h } = ctx.canvas;
	const { e: x, f: y } = ctx.getTransform();

	ctx.fillStyle = color;
	ctx.fillRect(-x - 2, -y - 2, w + 4, h + 4);
}

