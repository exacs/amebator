import React, {useRef, useEffect} from 'react'
import drawAmeba from './draw-ameba'

export default function Canvas ({ points }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d')

    ctx.strokeStyle = 'white'
    drawAmeba(ctx, points, 70, 70)
    ctx.stroke()
  }, [canvasRef])

  return <canvas ref={canvasRef} width={500} height={500} style={{border: '1px solid white'}} />
}
