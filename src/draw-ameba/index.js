import { getTangent, getMinusRadius } from './geometry.js'

function drawArc (ctx, center, radius, start, end, antiClockwise) {
  const startAngle = Math.atan2(start[1] - center[1], start[0] - center[0])
  const endAngle = Math.atan2(end[1] - center[1], end[0] - center[0])

  ctx.arc(center[0], center[1], radius, startAngle, endAngle, antiClockwise)
}

export default function drawAmeba (ctx, points, firstRadius, lastRadius) {
  const radii = []

  radii[0] = firstRadius
  for (let i = 1; i < points.length; i++) {
    radii[i] = getMinusRadius(
      { x: points[i][0], y: points[i][1] },
      { x: points[i-1][0], y: points[i-1][1]},
      radii[i-1]
    )
  }

  const lastPoint = getTangent(
    {x: points[0][0], y: points[0][1], r: firstRadius},
    {x: points[points.length-1][0], y: points[points.length-1][1], r: radii[radii.length-1]},
    lastRadius
  )
  points.push([lastPoint.x, lastPoint.y])
  radii.push(lastRadius)

  // ctx.strokeStyle = 'black'
  ctx.beginPath()
  for (let i = 0; i < radii.length; i++) {
    const center = points[i]
    const start = i===0 ? points[points.length-1] : points[i-1]
    const end = i===radii.length-1 ? points[0] : points[i+1]
    const clockwise = i % 2 === 0

    drawArc(ctx, center, radii[i], start, end, clockwise)
  }
  ctx.closePath()
  // ctx.stroke()
}
