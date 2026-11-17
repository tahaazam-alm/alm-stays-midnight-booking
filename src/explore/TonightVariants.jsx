// EXPLORATION, not product UI: five ways to show the check-in tonight option in the search widget, next to the current one.
// CUSTOM: not in the design system — each variant composes WidgetField, Separator, Toggle and Chip into the stays card;
// the roll, the arrival switch and the offer strip have no library equivalent. The picked direction moves to src/custom.
import { useState } from 'react'
import { WidgetField, Separator, Toggle, Chip, LegacyButton } from 'design-system'
import { Icon } from '../shell/Icon.jsx'
import { useProto } from '../shell/PrototypeShell.jsx'
import { useCopy } from '../copy.js'
import { useStay, StayProvider } from '../state.jsx'
import { StayForm } from '../custom/StayForm.jsx'
import { clockFor, startOfDay, addDays, fmtFull, timeLabel, guestsLabel, earliestCheckIn } from '../logic.js'
import * as I from '../icons.js'
import '../custom/type.css'
import './TonightVariants.css'

const ROOMS = [{ adults: 2, children: 0, ages: [] }]

/** Two values stacked in one cell; the outgoing one lifts and blurs out as the incoming one rises in. Interruptible (transitions only). */
export function Roll({ on, off: a, to: b, className = '' }) {
  return (
    <span className={`tx-roll ${on ? 'is-on' : ''} ${className}`}>
      <span className="tx-roll__a" aria-hidden={on}>{a}</span>
      <span className="tx-roll__b" aria-hidden={!on}>{b}</span>
    </span>
  )
}

export function useDates() {
  const now = clockFor('midnight')
  const today = startOfDay(now)
  return { now, today: fmtFull(today), tomorrow: fmtFull(addDays(today, 1)) }
}

/** The stays card: destination, dates, a slot under the dates, guests, Search. `checkIn` / `checkOut` override the date cells. */
export function Card({ checkIn, checkOut, children, className = '' }) {
  const t = useCopy()
  const { dir } = useProto()
  const { today, tomorrow } = useDates()
  return (
    <div className={`stay-form tx-card ${className}`}>
      <WidgetField variant="populated" label={t('destination')} value={t.d('Riyadh')} icon={<Icon svg={I.pin} />} />
      <Separator className="stay-form__sep" />
      <div className="stay-form__dates">
        <WidgetField variant="populated" label={t('checkIn')} value={today} icon={<Icon svg={I.calendar} />} {...checkIn} />
        <span className="stay-form__arrow"><Icon svg={dir === 'rtl' ? I.chevronLeft : I.chevronRight} size={20} /></span>
        <WidgetField variant="populated" label={t('checkOut')} value={tomorrow} {...checkOut} />
      </div>
      {children}
      <Separator className="stay-form__sep" />
      <WidgetField variant="populated" label={t('guests')} value={guestsLabel(ROOMS)} icon={<Icon svg={I.usersTwo} />} />
      <div className="stay-form__foot"><LegacyButton variant="primary" label={t('searchStays')} leadingIcon={<Icon svg={I.search} />} /></div>
    </div>
  )
}

/** Toggle row shared by the row-based variants: icon, text block, DS Toggle; the whole row is tappable. */
export function Row({ on, set, icon, children, className = '' }) {
  const t = useCopy()
  return (
    <div className={`tx-row ${on ? 'is-on' : ''} ${className}`} onClick={(e) => { if (!e.target.closest('.toggle, button')) set(!on) }}>
      <span className="tx-row__icon">{icon ?? <Icon svg={I.night} />}</span>
      <span className="tx-row__text">{children}</span>
      <Toggle label="" aria-label={t('tonightShort')} checked={on} onChange={(e) => set(e.target.checked)} />
    </div>
  )
}
export const How = () => { const t = useCopy(); return <button type="button" className="tx-link t-body-semi t-link">{t('howItWorks')}</button> }

// A · Current: the real widget, tint sweeping over the dates
function CurrentInner() {
  const t = useCopy()
  const { now, search, nowOn, setCheckInNow } = useStay()
  return (
    <StayForm search={search} nowOn={false} checkInField={nowOn ? { value: fmtFull(earliestCheckIn(now)) } : undefined}
      nowRow={{ title: t('tonightTitle'), linkLabel: t('howItWorks'), onLink: () => {}, checked: nowOn, onChange: setCheckInNow }}>
      <LegacyButton variant="primary" label={t('searchStays')} leadingIcon={<Icon svg={I.search} />} />
    </StayForm>
  )
}
export const Current = () => <StayProvider><CurrentInner /></StayProvider>

// B · Dates roll: nothing is highlighted; the two date cells roll to their new values
export function DatesRoll() {
  const t = useCopy()
  const [on, set] = useState(false)
  const { today, tomorrow } = useDates()
  return (
    <Card
      checkIn={{ label: <Roll on={on} off={t('checkIn')} to={t('tonightShort')} />, value: <Roll on={on} off={today} to={t('tonightWindow')} />,
        icon: <Roll on={on} className="tx-roll--icon" off={<Icon svg={I.calendar} />} to={<Icon svg={I.night} />} /> }}
      checkOut={{ value: <Roll on={on} className="tx-roll--late" off={tomorrow} to={today} /> }}>
      <Row on={on} set={set}><span className="t-body">{t('tonightTitle')}</span><How /></Row>
    </Card>
  )
}

// C · Arrival switch: a two-way choice with a sliding pill instead of an on/off toggle
export function ArrivalSwitch() {
  const t = useCopy()
  const [on, set] = useState(false)
  const { today, tomorrow } = useDates()
  return (
    <Card checkOut={{ value: <Roll on={on} className="tx-roll--late" off={tomorrow} to={today} /> }}>
      <div className="tx-switch-wrap">
        <div className={`tx-switch ${on ? 'is-on' : ''}`} role="radiogroup" aria-label={t('xArriving')}>
          <span className="tx-switch__pill" aria-hidden="true" />
          <button type="button" role="radio" aria-checked={!on} className="tx-switch__opt t-body" onClick={() => set(false)}>{t('xLater')}</button>
          <button type="button" role="radio" aria-checked={on} className="tx-switch__opt t-body" onClick={() => set(true)}><Icon svg={I.night} size={16} />{t('xTonightWindow')}</button>
        </div>
      </div>
      <div className="tx-switch-how"><How /></div>
    </Card>
  )
}

// D · Docked tag: the offer strip folds away and the option lands in the check-in cell, where a clear button removes it
export function DockedTag() {
  const t = useCopy()
  const [on, set] = useState(false)
  const { now, today, tomorrow } = useDates()
  return (
    <Card className={on ? 'is-on' : ''}
      checkIn={{ label: <Roll on={on} off={t('checkIn')} to={t('tonightShort')} />,
        // The cell is a button, so the remove control is a span with a button role (as the library's own clear is)
        subtext: <span className="tx-dock">{t('tonightWindow')}<span role="button" tabIndex={on ? 0 : -1} aria-label={t('xRemoveTonight')} className="tx-dock__x"
          onClick={(e) => { e.stopPropagation(); set(false) }} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); set(false) } }}><Icon svg={I.x} size={12} /></span></span>,
        icon: <Roll on={on} className="tx-roll--icon" off={<Icon svg={I.calendar} />} to={<Icon svg={I.night} />} /> }}
      checkOut={{ value: <Roll on={on} className="tx-roll--late" off={tomorrow} to={today} /> }}>
      <div className="tx-fold" inert={on || undefined}>
        <div className="tx-fold__in">
          <div className="tx-strip">
            <Icon svg={I.night} size={20} />
            <span className="t-caption tx-strip__text">{t('xNeedRoom', timeLabel(now))}</span>
            <button type="button" className="tx-strip__action t-caption-semi" onClick={() => set(true)}>{t('tonightShort')}</button>
          </div>
        </div>
      </div>
    </Card>
  )
}

// E · Quiet row: only the moon fills and one line unfolds under the title
export function QuietRow() {
  const t = useCopy()
  const [on, set] = useState(false)
  const { today, tomorrow } = useDates()
  return (
    <Card checkOut={{ value: <Roll on={on} className="tx-roll--late" off={tomorrow} to={today} /> }}>
      <Row on={on} set={set} className="tx-row--quiet">
        <span className="t-body">{t('tonightTitle')}</span>
        <span className="tx-fold tx-fold--open-on"><span className="tx-fold__in t-caption tx-quiet__line">{t('xStartsNow', today)}</span></span>
        <How />
      </Row>
    </Card>
  )
}

// F · Quick chip: a design-system Chip under the dates, selected once on
export function QuickChip() {
  const t = useCopy()
  const [on, set] = useState(false)
  const { today, tomorrow } = useDates()
  return (
    <Card checkOut={{ value: <Roll on={on} className="tx-roll--late" off={tomorrow} to={today} /> }}>
      <div className="tx-chip-row">
        <Chip className="tx-chip" label={t('xTonightWindow')} icon={<Icon svg={I.night} size={16} />} selected={on} aria-pressed={on} onClick={() => set(!on)} />
        <How />
      </div>
    </Card>
  )
}
