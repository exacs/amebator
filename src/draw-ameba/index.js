import { getTangent, getMinusRadius } from './geometry.js'

function drawArc (ctx, center, radius, start, end, antiClockwise) {
  const startAngle = Math.atan2(start[1] - center[1], start[0] - center[0])
  const endAngle = Math.atan2(end[1] - center[1], end[0] - center[0])

  try {
    ctx.arc(center[0], center[1], radius, startAngle, endAngle, antiClockwise)
    return true
  } catch (err) {
    return false
  }
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
  const allPoints = points.concat([[lastPoint.x, lastPoint.y]])
  radii.push(lastRadius)

  // ctx.strokeStyle = 'black'
  ctx.beginPath()
  let result = !isNaN(lastPoint.x) && !isNaN(lastPoint.y)

  for (let i = 0; i < radii.length; i++) {
    const center = allPoints[i]
    const start = i===0 ? allPoints[allPoints.length-1] : allPoints[i-1]
    const end = i===radii.length-1 ? allPoints[0] : allPoints[i+1]
    const clockwise = i % 2 === 0

    result = drawArc(ctx, center, radii[i], start, end, clockwise) && result
  }
  ctx.closePath()

  return result
}
