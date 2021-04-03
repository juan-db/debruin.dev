// https://bugfree.dk/blog/2018/09/01/ray-tracing-computing-ray-circle-intersections


// === Globals ===================

// Line equation: y = mx + b.
let m = 1;
let b = 1;

// Circle equation: (x - p)^2 + (y - q)^2 = r^2.
let r = 100;
let p = 0;
let q = 0;

// Whether to draw the x and y axes.
let showAxes = false;


const body = document.querySelector('body');
const canvas = body.querySelector('canvas#circleline');
const parameters = body.querySelector('form#parameters');

let themes = {
	'light': {
		clearColor: 'white',
		textColor: 'black',
		lineColor: 'blue',
		circleColor: 'green',
		axesColor: 'lightgray',
		intersectionColor: 'red'
	},
	'dark': {
		clearColor: '#292929',
		textColor: 'white',
		lineColor: '#F2C57C',
		circleColor: '#7FB685',
		axesColor: '#393939',
		intersectionColor: '#BF3F3C'
	},
	'high-contrast': {
		clearColor: '#292929',
		textColor: 'white',
		lineColor: '#4444FF',
		circleColor: 'green',
		axesColor: 'lightgray',
		intersectionColor: 'red'
	}
};

let theme = themes['dark'];

function setTheme(name) {
	theme = themes[name] || themes['dark'];

	const root = document.querySelector(':root');
	root.style.setProperty('--text-color', theme.textColor);
	root.style.setProperty('--background-color', theme.clearColor);

	redraw();
}


// === Drawing ===================

// Draw a circle at the specified coordinates.
function circle(ctx, x, y, radius) {
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, 2 * Math.PI);
	ctx.stroke();
}

// Draws a line across the canvas based on the provided slope and y-intercept.
function line(ctx, m, b) {
	ctx.beginPath();

	// x = (y - b) / m 
	// y = mx + b
	const offset = (() => {
		const transform = ctx.getTransform();
		return [ transform.e, transform.f ];
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

// Draws a line from point a to point b.
function linePoints(ctx, a, b) {
	ctx.beginPath();

	ctx.moveTo(a[0], a[1]);
	ctx.lineTo(b[0], b[1]);

	ctx.stroke();
}

// Clears the screen with the specified color.
function clear(ctx, color) {
	const w = ctx.canvas.width;
	const h = ctx.canvas.height;

	ctx.fillStyle = color;
	ctx.fillRect(-w / 2 - 2, -h / 2 - 2, w + 4, h + 4);
}

// === The math stuff ( ._.) =====

// m and b are the slope and y-intercept of the line.
// r is the radius of the circle.
// p and q are the circle's x and y offset respectively.
function getIntersections(m, b, r, p, q) {
	const A = 1 + m * m;
	const B = 2 * (m * b - m * q - p);
	const C = b * b + q * q - r * r + p * p - 2 * b * q;
	const D = B * B - 4 * A * C;

	const x = (() => {
		if (D < 0) {
			// No intersections.
			return [];
		} else if (D == 0) {
			// Single intersection.
			return [(-B) / (2 * A)];
		} else {
			// Two intersections.
			return [
				(-B + Math.sqrt(D)) / (2 * A),
				(-B - Math.sqrt(D)) / (2 * A)
			];
		}
	})();

	return x.map(i => [i, m * i + b]);
}


// === Program ===================

const ctx = canvas.getContext('2d');

// Apply transformations to:
// - put (0, 0) at the center of the canvas,
// - make up positive y, and
// - make right positive x.

// Set the origin (0, 0) to the center of the canvas.
ctx.translate(canvas.width / 2, canvas.height / 2);
// Flip the canvas horizontally.
ctx.scale(1, -1);



// - Clears the screen with the clear color,
// - draws a circle at (0, 0) with radius _r_,
// - draws a line across the canvas based on _m_ and _b_, and
// - calculates and draws the intersections of the line with the circle.
function redraw() {  
	clear(ctx, theme.clearColor);

	if (showAxes) {
		ctx.strokeStyle = theme.axesColor;
		linePoints(ctx, [-canvas.width / 2, 0], [canvas.width / 2, 0]);
		linePoints(ctx, [0, -canvas.height / 2], [0, canvas.height / 2]);
	}

	ctx.strokeStyle = theme.circleColor;
	circle(ctx, p, q, r);

	ctx.strokeStyle = theme.lineColor;
	line(ctx, m, b);

	ctx.strokeStyle = theme.intersectionColor;
	ctx.lineWidth = 6;
	for (const i of getIntersections(m, b, r, p, q)) {
		circle(ctx, ...i, 3);
	}
	ctx.lineWidth = 2;
}

// On input for any of the form fields, update all parameters and redraw the canvas.
(parameters.m.oninput = parameters.b.oninput = parameters.r.oninput = parameters.p.oninput = parameters.q.oninput = () => {
	m = +parameters.m.value;
	if (isNaN(m)) m = 0;
	parameters['m-range'].value = m;

	b = +parameters.b.value;
	if (isNaN(b)) b = 0;
	parameters['b-range'].value = b;

	r = +parameters.r.value;
	if (isNaN(r)) r = 0;
	parameters['r-range'].value = r;

	p = +parameters.p.value;
	if (isNaN(p)) p = 0;
	parameters['p-range'].value = p;

	q = +parameters.q.value;
	if (isNaN(q)) q = 0;
	parameters['q-range'].value = q;

	redraw();
})();

parameters['m-range'].oninput = parameters['b-range'].oninput = parameters['r-range'].oninput = parameters['p-range'].oninput = parameters['q-range'].oninput = (event) => {
	m = +parameters['m-range'].value;
	if (isNaN(m)) m = 0;
	parameters.m.value = m;

	b = +parameters['b-range'].value;
	if (isNaN(b)) b = 0;
	parameters.b.value = b;

	r = +parameters['r-range'].value;
	if (isNaN(r)) r = 0;
	parameters.r.value = r;

	p = +parameters['p-range'].value;
	if (isNaN(p)) p = 0;
	parameters.p.value = p;

	q = +parameters['q-range'].value;
	if (isNaN(q)) q = 0;
	parameters.q.value = q;


	redraw();
}

(parameters['theme-select'].onchange = (event) => {
	setTheme(parameters['theme-select'].value);
})();

(parameters['show-axes'].onchange = (event) => {
	showAxes = body.querySelector('input#show-axes').checked;

	redraw();
})();
