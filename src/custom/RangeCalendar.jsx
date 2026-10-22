// CUSTOM: not in the design system — vertically scrolling month list for picking a check-in/check-out range.
// Days before `minDate` are disabled: that rule is what hides "tonight" from past-midnight bookers.
import { WD, MONTH, sameDay } from '../logic.js'
import './RangeCalendar.css'

export function RangeCalendar({ start, end, minDate, months = 3, onChange }) {
  const pick = (d) => {
    if (!start || end || d <= start) onChange(d, null)
    else onChange(start, d)
  }
  const first = new Date(minDate.getFullYear(), minDate.getMonth(), 1)
  return (
    <div className="range-cal">
      <div className="range-cal__wd">{WD.map((w) => <span key={w} className="t-caption">{w}</span>)}</div>
      {Array.from({ length: months }, (_, mi) => {
        const m0 = new Date(first.getFullYear(), first.getMonth() + mi, 1)
        const days = new Date(m0.getFullYear(), m0.getMonth() + 1, 0).getDate()
        return (
          <section key={mi} className="range-cal__month">
            <h3 className="t-subtitle t-reset range-cal__title">{MONTH[m0.getMonth()]} <span className="t-subtext">{m0.getFullYear()}</span></h3>
            <div className="range-cal__grid">
              {Array.from({ length: m0.getDay() }, (_, i) => <span key={`b${i}`} />)}
              {Array.from({ length: days }, (_, i) => {
                const d = new Date(m0.getFullYear(), m0.getMonth(), i + 1)
                const isStart = sameDay(d, start)
                const isEnd = sameDay(d, end)
                const inRange = start && end && d > start && d < end
                const cls = ['range-cal__day', 't-body',
                  isStart && 'is-start', isEnd && 'is-end', (isStart || isEnd) && 'is-edge',
                  isStart && end && 'has-end', inRange && 'is-in',
                  sameDay(d, minDate) && 'is-today'].filter(Boolean).join(' ')
                return (
                  <button key={i} type="button" className={cls} disabled={d < minDate} onClick={() => pick(d)}>
                    <span>{i + 1}</span>
                  </button>
                )
              })}
            </div>
          </section>
        )
      })}
    </div>
  )
}
