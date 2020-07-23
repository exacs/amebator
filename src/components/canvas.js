import React, { useRef, useEffect, useState } from "react";
import drawAmeba from "../draw-ameba";

function useCanvas(callback) {
  const canvasRef = useRef(null);
  const [frameCount, setFrameCount] = useState(0);

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      setFrameCount(frameCount + 1);
    });

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [frameCount, setFrameCount]);

  if (canvasRef && canvasRef.current) {
    const ctx = canvasRef.current.getContext("2d");

    if (ctx) {
      ctx.clearRect(0, 0, 500, 500);
      callback(ctx);
    }
  }

  return canvasRef;
}

export default function Canvas({ data, mode }) {
  const canvasRef = useCanvas((ctx) => {
    if (mode === "color") {
      const colors = [
        [255, 0, 0],
        [255, 255, 0],
        [0, 255, 0],
        [0, 255, 255],
        [0, 0, 255],
        [255, 0, 255],
      ];

      ctx.globalCompositeOperation = "ligher";
      drawAmeba(ctx, data.circles, data.radii);

      for (let i = 0; i < data.circles.length; i++) {
        const circle = data.circles[i];
        const gradient = ctx.createRadialGradient(
          circle.x,
          circle.y,
          0,
          circle.x,
          circle.y,
          circle.r
        );
        const color = colors[i % colors.length];
        gradient.addColorStop(
          0,
          `rgba(${color[0]}, ${color[1]}, ${color[2]}, 1)`
        );
        gradient.addColorStop(
          1,
          `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0)`
        );
        ctx.fillStyle = gradient;
        ctx.fill();
      }
      ctx.stroke();
    } else {
      ctx.strokeStyle = "white";
      drawAmeba(ctx, data.circles, data.radii);
      ctx.stroke();
    }
  });

  return (
    <canvas
      ref={canvasRef}
      width={500}
      height={500}
      style={{ border: "1px solid white" }}
    />
  );
}
