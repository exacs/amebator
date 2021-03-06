import React, { useRef, useEffect, useState } from "react";
import { drawCircle } from "../draw-ameba";

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

export default function Canvas({ data }) {
  const canvasRef = useCanvas((ctx) => {
    ctx.strokeStyle = "white";
    ctx.setLineDash([3, 3]);

    for (const circle of data.circles) {
      drawCircle(ctx, [circle.x, circle.y], circle.r);
      ctx.stroke();
    }
  });

  return (
    <canvas
      ref={canvasRef}
      width={500}
      height={500}
      style={{ border: "1px solid white", position: "absolute" }}
    />
  );
}
