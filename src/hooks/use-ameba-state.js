import { useState } from "react";

function distance(c0, c1) {
  return Math.sqrt((c0.x - c1.x) ** 2 + (c0.y - c1.y) ** 2) - c0.r - c1.r;
}

function replaceObject(arr, i, val) {
  return arr.map((v, j) => (i === j ? { ...v, ...val } : v));
}

function replaceValue(arr, i, val) {
  return arr.map((v, j) => (i === j ? val : v));
}

/**
 * Return a list of "size" circles positioned around the point (250,250)
 *
 * @param {number} size Number of circles to generate
 */
export function generateCircles(size) {
  const increment = (Math.PI * 2) / size;
  const radius = 50;

  return Array.from({ length: size }, (_, i) => ({
    x: 250 + 100 * Math.cos(increment * i),
    y: 250 + 100 * Math.sin(increment * i),
    r: radius,
  }));
}

/**
 * Generate an initial ameba data, i.e., circles and radii
 *
 * @param {number} size Number of circles to base the data
 */
export function generateData(size) {
  const circles = generateCircles(size);
  return {
    circles,
    radii: Array.from({ length: size }, (_) => 50),
  };
}

/**
 * Get a fixed version of radii
 * @param {*} circles
 * @param {*} radii
 */
export function getFixedRadii(circles, radii) {
  const result = [];

  for (let i = 0; i < circles.length; i++) {
    const minDiameter = distance(circles[i], circles[(i + 1) % circles.length]);
    const radius = Math.abs(radii[i]);
    const sign = radii[i] > 0 ? 1 : -1;

    result.push(sign * Math.max(minDiameter / 2, radius));
  }

  return result;
}

export default function useAmebaState(defaultData, size) {
  const [data, setData] = useState(defaultData || generateData(size));

  function setCircles(circles) {
    setData({
      circles,
      radii: getFixedRadii(circles, data.radii),
    });
  }

  function setSize(size) {
    setData(generateData(size));
  }

  function setCircleCenter(i, { x, y }) {
    setCircles(replaceObject(data.circles, i, { x, y }));
  }

  function setCircleRadius(i, r) {
    setCircles(replaceObject(data.circles, i, { r }));
  }

  function setTangentRadius(i, r) {
    setData({
      circles: data.circles,
      radii: replaceValue(data.radii, i, r),
    });
  }

  return {
    data,
    setData,
    setCircles,
    setSize,
    setCircleCenter,
    setCircleRadius,
    setTangentRadius,
  };
}
