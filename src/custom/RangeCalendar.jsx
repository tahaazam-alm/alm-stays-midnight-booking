// CUSTOM: not in the design system — vertically scrolling month list for picking a check-in/check-out range.
// Days before `minDate` are disabled: that rule is what hides "tonight" from past-midnight bookers.
// `mark` ({ date, label } or { date, icon }) annotates one day, e.g. tonight in the instant check-in explorations.
// `tip` ({ date, node, tone }) floats a tooltip over the week above that day, its caret on the day (check-in now).
// `shownStart` paints the range from a later day than the real check-in (check-in now: booked from tonight, shown from today).
// When `tip.tone` changes the bubble morphs: its box slides to the new size while the old words fade out and the new ones fade in.
// `lockStart` keeps the check-in fixed so taps only move check-out; `tone="night"` paints the range teal (check-in now).
import { useLayoutEffect, useRef } from 'react'
import { wdShortNames, monthNames, sameDay } from '../logic.js'
import { Icon } from '../shell/Icon.jsx'
import './RangeCalendar.css'

export function RangeCalendar({ start, end, shownStart, minDate, mark, lockStart, tone, tip, months = 3, onChange }) {
  const pick = (d) => {
    if (lockStart) { if (d > start) onChange(start, d) }
    else if (!start || end || d <= start) onChange(d, null)
    else onChange(start, d)
  }
  const bubbleRef = useRef(null)
  const prev = useRef(null)
  useLayoutEffect(() => {
    const el = bubbleRef.current
    const box = (b) => ({ left: b.offsetLeft, top: b.offsetTop, width: b.offsetWidth, height: b.offsetHeight }) // unscaled, so the phone frame's zoom doesn't skew it
    const p = prev.current
    if (el && p && p.tone && tip?.tone && p.tone !== tip.tone && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const a = p.box, b = box(el)
      const px = (r) => ({ left: `${r.left}px`, top: `${r.top}px`, width: `${r.width}px`, height: `${r.height}px`, right: 'auto', bottom: 'auto', transform: 'none' })
      const ease = 'cubic-bezier(.32, .72, 0, 1)', dur = 420
      el.classList.add('is-morphing')
      el.animate([px(a), px(b)], { duration: dur, easing: ease }).finished.then(() => el.classList.remove('is-morphing'), () => {})
      // Both sets of words stay centred in the box as it resizes, so it closes in (or opens out) evenly from both sides
      const pane = el.firstElementChild
      const ghost = p.clone.firstElementChild
      ghost.classList.add('range-cal__tip-ghost')
      ghost.style.width = `${a.width}px`
      pane.append(ghost)
      ghost.animate([{ opacity: 1, filter: 'blur(0)' }, { opacity: 0, filter: 'blur(2px)' }], { duration: 180, easing: 'ease-out', fill: 'forwards' })
        .finished.then(() => ghost.remove(), () => ghost.remove())
      Array.from(pane.children).filter((c) => c !== ghost).forEach((c) => c.animate([{ opacity: 0, filter: 'blur(2px)' }, { opacity: 1, filter: 'blur(0)' }], { duration: 260, delay: 110, easing: 'ease-out', fill: 'backwards' }))
    }
    prev.current = el ? { tone: tip?.tone, box: box(el), clone: el.cloneNode(true) } : null
  })
  const first = new Date(minDate.getFullYear(), minDate.getMonth(), 1)
  return (
    <div className={`range-cal ${tone ? `range-cal--${tone}` : ''}`}>
      <div className="range-cal__wd">{wdShortNames().map((w) => <span key={w} className="t-caption">{w}</span>)}</div>
      {Array.from({ length: months }, (_, mi) => {
        const m0 = new Date(first.getFullYear(), first.getMonth() + mi, 1)
        const days = new Date(m0.getFullYear(), m0.getMonth() + 1, 0).getDate()
        return (
          <section key={mi} className="range-cal__month">
            <h3 className="t-subtitle t-reset range-cal__title">{monthNames()[m0.getMonth()]} <span className="t-subtext">{m0.getFullYear()}</span></h3>
            <div className="range-cal__grid">
              {Array.from({ length: m0.getDay() }, (_, i) => <span key={`b${i}`} />)}
              {Array.from({ length: days }, (_, i) => {
                const d = new Date(m0.getFullYear(), m0.getMonth(), i + 1)
                const from = shownStart || start
                const isStart = sameDay(d, from)
                const isEnd = sameDay(d, end) && !isStart
                const inRange = from && end && d > from && d < end
                const long = from && end && end - from > 1.5 * 864e5 // at least one day between check-in and check-out
                const cls = ['range-cal__day', 't-body',
                  isStart && 'is-start', isEnd && 'is-end', (isStart || isEnd) && 'is-edge',
                  isStart && !(end && sameDay(end, from)) && 'has-end', (isStart || isEnd) && long && 'is-long', inRange && 'is-in',
                  sameDay(d, minDate) && !mark && 'is-today'].filter(Boolean).join(' ')
                const marked = mark && sameDay(d, mark.date)
                return (
                  <button key={i} type="button" className={cls} disabled={d < minDate} onClick={() => pick(d)}>
                    <span>
                      {i + 1}
                      {marked && mark.label && <small className="range-cal__mark t-caption">{mark.icon && <Icon svg={mark.icon} size={10} />}{mark.label}</small>}
                      {marked && mark.icon && !mark.label && <Icon svg={mark.icon} size={12} className="range-cal__mark range-cal__mark--icon" />}
                    </span>
                  </button>
                )
              })}
              {tip && tip.date.getMonth() === m0.getMonth() && tip.date.getFullYear() === m0.getFullYear() && (() => {
                const n = m0.getDay() + tip.date.getDate() - 1
                return (
                  <div className={`range-cal__tip ${tip.tone ? `range-cal__tip--${tip.tone}` : ''}`} data-edge={n % 7 === 0 ? 'start' : n % 7 === 6 ? 'end' : undefined} style={{ gridRow: `${Math.floor(n / 7) + 1} / span 1`, gridColumn: `${(n % 7) + 1} / span 1`, '--col': n % 7 }}>
                    <div ref={bubbleRef} className="range-cal__tip-bubble">{tip.node}</div>
                    <span className="range-cal__tip-caret" />
                  </div>
                )
              })()}
            </div>
          </section>
        )
      })}
    </div>
  )
}
