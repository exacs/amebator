/**
 * @typedef {Object} Circle
 * @property {number} x x-coordinate of circle's center
 * @property {number} y y-coord of circle's center
 * @property {number} r circle's radius
 */

/**
 * @typedef {Object} Point
 * @property {number} x
 * @property {number} y
 */

/**
 * Returns the intersection between two circles
 * @param {Circle} circle0 first circle
 * @param {Circle} circle1 second circle
 * @param {boolean} sign Gives one solution or another
 * @return {Point}
 */
export function intersection (circle0, circle1, sign) {
  const {r: r0, x: a, y: b} = circle0
  const {r: r1, x: c, y: d} = circle1

  const D = Math.sqrt((c - a) * (c - a) + (d - b) * (d - b))
  const delta = 1/4 * Math.sqrt((D + r0 + r1) * (D + r0 - r1) * (D - r0 + r1) * (-D + r0 + r1))

  const mult = sign ? -1 : 1
  const x1b = 2 * (b - d) / (D * D) * delta
  const y1b = 2 * (a - c) / (D * D) * delta

  const x1 = (a + c) / 2 + (c-a) * (r0*r0 - r1*r1) / (2 * D * D) + mult * x1b
  const y1 = (b + d) / 2 + (d-b) * (r0*r0 - r1*r1) / (2 * D * D) - mult * y1b

  return {x: x1, y: y1}
}

/**
 * Get the tangent circle of two given circles and the radius of the tangent
 * @param {Circle} circle0 first circle
 * @param {Circle} circle1 second circle
 * @param {number} radius radius of the tangent
 * @return {Point} Center of the circle
 */
export function getTangent (circle0, circle1, radius) {
  const radius0 = circle0.r + radius
  const radius1 = circle1.r + radius

  return intersection(
    {x: circle0.x, y: circle0.y, r: radius0},
    {x: circle1.x, y: circle1.y, r: radius1},
    false
  )
}


/**
 * Get the distance between "center" and "direction" minus "minusR"
 * @param {Point} center center of the circle
 * @param {Point} direction point with the other end of the vector
 * @param {number} minusR
 */
export function getMinusRadius (center, direction, minusR) {
  return Math.sqrt((center.x - direction.x)**2 + (center.y - direction.y)**2) - minusR
}
