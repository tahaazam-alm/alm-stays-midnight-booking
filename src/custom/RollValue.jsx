// CUSTOM: not in the design system — WidgetField has no transition for a value that changes in place.
// The new value rolls up into the cell (a keyed span, so each change replays it); nothing moves on first render.
import { useEffect, useRef } from 'react'
import './RollValue.css'

export function RollValue({ value }) {
  const first = useRef(true)
  useEffect(() => { first.current = false }, [])
  return <span key={value} className={`roll-value ${first.current ? '' : 'roll-value--in'}`}>{value}</span>
}
