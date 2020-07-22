import {useState} from "react";

/**
 * Return a list of "size" circles positioned around the point (250,250)
 *
 * @param {number} size Number of circles to generate
 */
export function generateCircles (size) {
  const increment = (Math.PI * 2) / size;
  const radius = 50;

  return Array.from({ length: size }, (_, i) => ({
    x: 250 + 100 * Math.cos(increment * i),
    y: 250 + 100 * Math.sin(increment * i),
    r: radius,
  }))
}

/**
 * Generate an initial ameba data, i.e., circles and radii
 *
 * @param {number} size Number of circles to base the data
 */
export function generateData(size) {
  const circles = generateCircles(size)
  return {
    circles,
    radii: Array.from({ length: size }, (_) => 50),
  };
}

export default function useAmebaState (size) {
  const [data, useData] = useState(generateData(size))

  return { data, useData }
}
