import React from "react";
import "./PlusMinus.css"

export default function PlusMinus ({ amount, onSetAmount }) {
  return (
    <div className="PlusMinus">
      <button className="PlusMinus-button" onClick={() => onSetAmount(amount + 1)}>+</button>
      <div className="PlusMinus-value">{amount * 2 + 1}</div>
      <button className="PlusMinus-button" onClick={() => onSetAmount(amount - 1)}>–</button>
    </div>
  )
}