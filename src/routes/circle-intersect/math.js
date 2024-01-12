export function toRadians(degrees) {
	return degrees * (Math.PI / 180);
}

/**
 * Finds all intersections between a line and circle.
 * The line equation is y = mx + b.
 * The circle equation is (x - p)² + (y - q)² = r².
 *
 * @param m the slope of the line.
 * @param b the y-intercept of the line.
 * @param r the radius of the circle.
 * @param p the x offset of the circle.
 * @param q the y offset of the circle.
 * @returns {(Number)[][]} an array of zero to two elements representing all
 * intersections between the given line and circle.
 */
export function getLineIntersections(m, b, r, p, q) {
	const A = 1 + m * m;
	const B = 2 * (m * b - m * q - p);
	const C = b * b + q * q - r * r + p * p - 2 * b * q;
	const D = B * B - 4 * A * C;

	const x = (() => {
		if (D < 0) {
			// No intersections.
			return [];
		} else if (D === 0) {
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

/**
 * @param x the x coordinate of the origin of the ray.
 * @param y the y coordinate of the origin of the ray.
 * @param angle the angle of the ray in radians.
 * @param m the magnitude of the ray.
 * @param r the radius of the circle.
 * @param p the x offset of the circle.
 * @param q the y offset of the circle.
 * @returns {(Number)[][]} an array of zero to two elements representing all
 * intersections between the given ray and circle. The order of the elements in the
 * returned array are determined by which intersection is closest to the origin of the
 * ray. I.e. starting at the origin of the ray (x, y), travelling in angle direction,
 * the first intersection will be first in the array, the second second, etc.
 */
export function getRayIntersections(x, y, angle, m, r, p, q) {
	const x1 = x;
	const y1 = y;
	const x2 = x1 + Math.cos(angle) * m;
	const y2 = y1 + Math.sin(angle) * m;

	const A = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
	const B = 2 * (x2 - x1) * (x1 - p) + 2 * (y2 - y1) * (y1 - q);
	const C = (x1 - p) * (x1 - p) + (y1 - q) * (y1 - q) - r * r;
	const D = B * B - 4 * A * C;

	const s = Math.sqrt(D);
	return [
		(-B + s) / (2 * A),
		(-B - s) / (2 * A)
	]
		.filter(x => x > 0 && x < 1)
		.sort((a, b) => a - b)
		.map(t => [(x2 - x1) * t + x1, (y2 - y1) * t + y1]);
}
