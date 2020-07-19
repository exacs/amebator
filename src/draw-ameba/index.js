import { intersection } from "./geometry.js";

export default function drawAmeba(ctx, circles, radii) {
  const arcArgs = [];

  for (let i = 0; i < circles.length; i++) {
    const circle0 = circles[i];
    const circle1 = circles[(i + 1) % circles.length];

    const point = intersection(
      { ...circle0, r: circle0.r + radii[i] },
      { ...circle1, r: circle1.r + radii[i] },
      true
    );

    arcArgs.push(
      [circle0.x, circle0.y, circle0.r],
      [point.x, point.y, radii[i]]
    );
  }

  for (let i = 0; i < arcArgs.length; i++) {
    const point = arcArgs[i];
    const p0 = arcArgs[(i - 1 + arcArgs.length) % arcArgs.length];
    const p1 = arcArgs[(i + 1) % arcArgs.length];

    const l0 = [p0[0] - point[0], p0[1] - point[1]];
    const l1 = [p1[0] - point[0], p1[1] - point[1]];

    const a0 = Math.atan2(l0[1], l0[0]);
    const a1 = Math.atan2(l1[1], l1[0]);

    arcArgs[i].push(a0, a1);
    arcArgs[i].push(i % 2 === 1);
  }

  ctx.beginPath();
  for (let arc of arcArgs) {
    ctx.arc(...arc);
  }
  ctx.closePath();
  ctx.stroke();
}
