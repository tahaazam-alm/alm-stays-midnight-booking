// EXPLORATION, not product UI: ways for the check-in tonight option to arrive on the search widget instead of being there from the start.
// It shows up shortly after the page loads (A–D), or once the traveller picks tonight's date in the calendar (E, F).
// CUSTOM: not in the design system — entrance choreography around WidgetField, Toggle and the prototype's own row, tip and calendar.
import { useEffect, useState } from 'react'
import { Button, Separator, Toggle } from 'design-system'
import { Icon } from '../shell/Icon.jsx'
import { useCopy } from '../copy.js'
import { clockFor, startOfDay, addDays, fmtFull, fmtDay, sameDay } from '../logic.js'
import { NowToggleRow } from '../custom/NowToggleRow.jsx'
import { NightTip } from '../custom/NightBanner.jsx'
import { RangeCalendar } from '../custom/RangeCalendar.jsx'
import { Roll, Card, useDates } from './TonightVariants.jsx'
import * as I from '../icons.js'
import './RevealVariants.css'

const LOAD_DELAY = 700 // the page settles first; the option arrives after

/** True once `ms` have passed since mount. Replay remounts the variant. */
function useArrived(ms = LOAD_DELAY) {
  const [shown, set] = useState(false)
  useEffect(() => { const id = setTimeout(() => set(true), ms); return () => clearTimeout(id) }, [ms])
  return shown
}
const rollOut = (on, today, tomorrow) => ({ value: <Roll on={on} className="tx-roll--late" off={tomorrow} to={today} /> })
/** The title as one span per letter (per word in Arabic, whose letters join), so a wave can run through it. */
function Wave({ text }) {
  const parts = /[\u0600-\u06FF]/.test(text) ? text.split(/(\s+)/) : [...text]
  return <span className="rv-wave" style={{ '--n': parts.length }} aria-hidden="true">{parts.map((c, i) => <span key={i} style={{ '--i': i }}>{c}</span>)}</span>
}
const TonightRow = ({ on, set, tinted = true, wave }) => {
  const t = useCopy()
  return <NowToggleRow tinted={tinted} className="stay-form__now" label={t('tonightTitle')} title={wave ? <Wave text={t('tonightTitle')} /> : t('tonightTitle')} linkLabel={t('howItWorks')} onLink={() => {}} checked={on} onChange={set} />
}

// A · Unfold: the row opens under the dates and the card grows
export function Unfold() {
  const shown = useArrived()
  const [on, set] = useState(false)
  const { today, tomorrow } = useDates()
  return (
    <Card checkOut={rollOut(on, today, tomorrow)}>
      <div className={`rv-fold ${shown ? 'is-shown' : ''}`} inert={!shown || undefined}><div><TonightRow on={on} set={set} /></div></div>
    </Card>
  )
}

// G · Plain shimmer: the row opens a second after load with no tint; an aqua wave runs through its title letter by letter, there and back
export function PlainShimmer() {
  const shown = useArrived(1000)
  const [on, set] = useState(false)
  const { today, tomorrow } = useDates()
  return (
    <Card checkOut={rollOut(on, today, tomorrow)}>
      <div className={`rv-fold rv-shimmer ${shown ? 'is-shown' : ''}`} inert={!shown || undefined}><div><Separator className="stay-form__sep" /><TonightRow tinted={false} wave on={on} set={set} /></div></div>
    </Card>
  )
}

// H · Blob shimmer: the plain row opens a second after load, and one soft blob of aqua light drifts across the whole row
export function CellShimmer({ band = false, reveal = true }) {
  const shown = useArrived(1000)
  const [on, set] = useState(false)
  const { today, tomorrow } = useDates()
  return (
    <Card checkOut={rollOut(on, today, tomorrow)}>
      <div className={`rv-fold rv-sheen ${band ? 'rv-sheen--band' : ''} ${reveal ? '' : 'rv-fold--there'} ${shown ? 'is-shown' : ''}`} inert={(reveal && !shown) || undefined}><div><Separator className="stay-form__sep" /><TonightRow tinted={false} on={on} set={set} /></div></div>
    </Card>
  )
}

// I · Band shimmer: H with a straight band of light instead of the blob. Reveal off: the row is there from the start and only the band plays.
export const BandShimmer = ({ reveal = true }) => <CellShimmer band reveal={reveal} />

// B · Tucked tab: a tab slides out from under the card, so nothing inside the card moves
export function TuckedTab() {
  const t = useCopy()
  const shown = useArrived()
  const [on, set] = useState(false)
  const { today, tomorrow } = useDates()
  return (
    <div className="rv-tuck tx-card">
      <Card checkOut={rollOut(on, today, tomorrow)} />
      <div className={`rv-tab night-tint is-on ${shown ? 'is-shown' : ''}`} inert={!shown || undefined} onClick={(e) => { if (!e.target.closest('.toggle')) set(!on) }}>
        <Icon svg={I.night} size={20} />
        <span className="t-body rv-tab__text">{t('tonightTitle')}</span>
        <Toggle label="" aria-label={t('tonightShort')} checked={on} onChange={(e) => set(e.target.checked)} />
      </div>
    </div>
  )
}

// C · Cell whisper: one small line appears inside the check-in cell; tapping it rolls the cell to tonight
export function CellWhisper() {
  const t = useCopy()
  const shown = useArrived()
  const [on, set] = useState(false)
  const { today, tomorrow } = useDates()
  const key = (fn) => (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); fn() } }
  return (
    <Card className={`rv-whisper ${shown ? 'is-shown' : ''}`}
      checkIn={{ label: <Roll on={on} off={t('checkIn')} to={t('tonightShort')} />,
        subtext: <span className="rv-whisper__line"><Roll on={on}
          off={<span role="button" tabIndex={shown && !on ? 0 : -1} className="rv-whisper__offer" onClick={(e) => { e.stopPropagation(); set(true) }} onKeyDown={key(() => set(true))}><Icon svg={I.night} size={12} />{t('xArrivingTonight')}</span>}
          to={<span className="rv-whisper__on">{t('tonightWindow')}<span role="button" tabIndex={on ? 0 : -1} aria-label={t('xRemoveTonight')} className="tx-dock__x" onClick={(e) => { e.stopPropagation(); set(false) }} onKeyDown={key(() => set(false))}><Icon svg={I.x} size={12} /></span></span>} /></span>,
        icon: <Roll on={on} className="tx-roll--icon" off={<Icon svg={I.calendar} />} to={<Icon svg={I.night} />} /> }}
      checkOut={rollOut(on, today, tomorrow)} />
  )
}

// D · Pointer tip: a tooltip pops out of the check-in cell, over the card
export function PointerTip() {
  const t = useCopy()
  const shown = useArrived()
  const [on, set] = useState(false)
  const { today, tomorrow } = useDates()
  return (
    <Card className="rv-tipcard" checkOut={rollOut(on, today, tomorrow)}>
      <div className="rv-tip-anchor">
        <div className={`rv-tip ${shown ? 'is-shown' : ''}`} inert={!shown || undefined}>
          <NightTip arrow="top" title={t('tonightShort')} body={t('tonightWindow')} toggle={{ checked: on, onChange: set }} />
        </div>
      </div>
    </Card>
  )
}

// E, F · From the calendar: nothing on the widget until tonight's date is picked in the calendar.
// `mode`: 'footer' raises the tinted row in the calendar footer; 'tip' pops a tooltip on the date itself.
function CalendarFlow({ mode }) {
  const t = useCopy()
  const now = clockFor('midnight')
  const today = startOfDay(now)
  const [range, setRange] = useState({ start: today, end: addDays(today, 1) })
  const [draft, setDraft] = useState(range)
  const [open, setOpen] = useState(false)
  const [offered, setOffered] = useState(false) // true once tonight's date was picked by hand
  const [on, setOn] = useState(false)
  const show = () => { setDraft(range); setOpen(true) }
  const pick = (start, end) => {
    const tonight = sameDay(start, today)
    if (!end) setOffered(tonight)
    if (!tonight) setOn(false)
    setDraft({ start, end })
  }
  const confirm = () => { setRange(draft); setOpen(false) }
  const tip = mode === 'tip' && offered ? { date: today, node: <NightTip arrow="none" title={t('tonightShort')} body={t('tonightWindow')} toggle={{ checked: on, onChange: setOn }} /> } : null
  const press = { onPress: show }
  return (
    <div className={`rv-flow tx-card ${open ? 'is-open' : ''}`}>
      <div className="rv-flow__page" inert={open || undefined}>
        <Card className="rv-flow__card" checkIn={{ value: fmtFull(range.start), ...press }} checkOut={{ value: fmtFull(range.end), ...press }}>
          <div className={`rv-fold rv-fold--late ${offered && !open ? 'is-shown' : ''}`} inert={!offered || undefined}><div><TonightRow on={on} set={setOn} /></div></div>
        </Card>
      </div>
      <div className="rv-sheet" inert={!open || undefined}>
        <div className="rv-sheet__head"><span className="t-subtitle">{t('selectDates')}</span>
          <button type="button" className="rv-sheet__x" aria-label={t('close')} onClick={() => setOpen(false)}><Icon svg={I.x} size={20} /></button></div>
        <div className="rv-sheet__body">
          <RangeCalendar months={1} start={draft.start} end={draft.end} minDate={today} tone={on ? 'night' : undefined} tip={tip} onChange={pick} />
        </div>
        <div className="rv-sheet__foot">
          {mode === 'footer' && <div className={`rv-fold ${offered ? 'is-shown' : ''}`} inert={!offered || undefined}><div><TonightRow on={on} set={setOn} /></div></div>}
          <span className="t-body rv-sheet__line"><b>{fmtDay(draft.start)} –</b> {draft.end ? <b>{fmtDay(draft.end)}</b> : <span className="t-subtext">{t('selectCheckoutShort')}</span>}</span>
          <Button variant="primary" label={t('confirm')} disabled={!draft.end} onClick={confirm} />
        </div>
      </div>
    </div>
  )
}
export const CalendarFooter = () => <CalendarFlow mode="footer" />
export const CalendarTip = () => <CalendarFlow mode="tip" />
