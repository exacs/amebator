import React from 'react'

function Knob ({ top, left }) {
  return (
    <div style={{
      top: `${top - 5}px`,
      left: `${left - 5}px`,
      width: '8px',
      height: '8px',
      borderRadius: '100%',
      border: '#fff 1px solid',
      position: 'absolute'
    }} />
  )
}

export default function Controls ({ points }) {
  return (
    <div style={{width: '500px', height: '500px', position: 'absolute', top: '1px', left: '1px'}}>
      {
        points.map((point, i) => (
          <Knob key={i} top={point[1]} left={point[0]} />
        ))
      }
    </div>
  )
}
