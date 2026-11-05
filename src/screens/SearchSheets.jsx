// 1.1 destination · 1.2 dates · 1.3 guests — the pickers opened from the search card.
import { useEffect, useState } from 'react'
import { BottomSheet, Search, Cell, Button, MultiSelection, Chip, Dialog, WidgetField } from 'design-system'
import { Icon } from '../shell/Icon.jsx'
import { useStay, checkInNowDates } from '../state.jsx'
import { useCopy } from '../copy.js'
import { RECENT_DESTINATIONS, POPULAR_CITIES } from '../data.js'
import { earliestCheckIn, rangeSummary, isPastMidnight, timeLabel, destCity, sameDay, fmtDay } from '../logic.js'
import { NightTip } from '../custom/NightBanner.jsx'
import { NowToggleRow } from '../custom/NowToggleRow.jsx'
import { RangeCalendar } from '../custom/RangeCalendar.jsx'
import * as I from '../icons.js'
import HowHero from '../custom/HowHero.jsx'

// 1.1
export function DestinationSheet({ open, onClose, onPick }) {
  const t = useCopy()
  const [q, setQ] = useState('')
  useEffect(() => { if (open) setQ('') }, [open])
  const match = (d) => !q || `${d.name} ${d.region} ${t.d(d.name)} ${t.d(d.region)}`.toLowerCase().includes(q.toLowerCase())
  const row = (d, icon) => (
    <Cell dir={t.dir} key={d.name} visual="icon" icon={<Icon svg={icon} />} label={t.d(d.name)} subtext={t.d(d.region)} trailing="none" onClick={() => onPick(d)} />
  )
  return (
    <BottomSheet open={open} size="fullscreen" title={t('searchDestination')} onClose={onClose}
      search={<Search value={q} onChange={(e) => setQ(e.target.value)} onClear={() => setQ('')} placeholder={t('whereTo')} />}>
      <div className="sheet-list">
        <Cell dir={t.dir} visual="icon" icon={<Icon svg={I.navArrow} />} label={t('autoDetect')} trailing="none" showSeparator={false} />
        <div className="sheet-eyebrow"><span className="t-subtitle">{t('recent')}</span><span className="t-subtitle t-link">{t('clear')}</span></div>
        {RECENT_DESTINATIONS.filter(match).map((d) => row(d, I.history))}
        <div className="sheet-eyebrow"><span className="t-subtitle">{t('popularCities')}</span></div>
        {POPULAR_CITIES.filter(match).map((d) => row(d, I.pin))}
      </div>
    </BottomSheet>
  )
}

// 1.2

export function DatesSheet({ open, onClose, onConfirm, onHowItWorks }) {
  const t = useCopy()
  const { now, search, variant, awayTime } = useStay()
  const [range, setRange] = useState({ start: search.checkIn, end: search.checkOut })
  // The sheet keeps its own opt-in until Confirm, so closing it changes nothing
  const [nowOn, setNowOn] = useState(search.checkInNow)
  useEffect(() => { if (open) { setRange({ start: search.checkIn, end: search.checkOut }); setNowOn(search.checkInNow) } }, [open, search.checkIn, search.checkOut, search.checkInNow])
  const optIn = (on) => {
    const d = checkInNowDates(now, { checkIn: range.start, checkOut: range.end }, on)
    setNowOn(on); setRange({ start: d.checkIn, end: d.checkOut })
  }
  const offerNow = variant !== 'base' && isPastMidnight(now) && !nowOn && range.start && sameDay(range.start, now)
  const sum = range.end && rangeSummary(range.start, range.end)
  // Opted in: the stay is booked from tonight, but the calendar shows it from today's date (it's already Fri 23), so only today lights up
  const today = earliestCheckIn(now)
  const nowView = variant !== 'base' && nowOn
  const city = destCity(search.dest)
  // A: an offer tooltip with a Check in now action, swapped for a Remove tip in the footer once on.
  // B: the same tooltip with a toggle; it stays on today's cell in both states.
  // B · row in widget: no tooltip; the toggle row sits in the footer, which takes the widget's night tint once on.
  const navyRow = false // settled on the row in the widget
  const nowRow = variant === 'b' && (offerNow || nowView)
  const tip = nowRow ? null : variant === 'b'
    ? (offerNow || nowView) && { date: today, node: (
      <NightTip arrow="none" title={t('wantNowTitle')} body={t('nowWindowNote')}
        toggle={{ checked: nowOn, onChange: optIn }} />
    ) }
    : offerNow && { date: range.start, node: <NightTip arrow="none" title={t('needNowTitle')} body={t('tipNowBody', timeLabel(now), t.d(city))} actionLabel={t('needNowAction')} onAction={() => optIn(true)} /> }
  return (
    <BottomSheet open={open} size="fullscreen" title={t('selectDates')} onClose={onClose}>
      <RangeCalendar start={range.start} end={range.end} minDate={nowView ? today : earliestCheckIn(now, nowOn)}
        shownStart={nowView ? today : undefined} lockStart={nowView} tone={nowView ? 'night' : undefined}
        tip={tip} onChange={(start, end) => setRange({ start, end })} />
      <div className={`dates-sheet__foot night-tint ${nowRow && nowOn && !navyRow ? 'is-on' : ''}`}>
        {nowRow && (navyRow
          ? <NowToggleRow navy className="dates-sheet__now-row" title={t(nowOn ? 'tonightOnShort' : 'tonightShort')} subtext={t('tonightWindow')} note={awayTime && t('tipNowBody', timeLabel(awayTime), t.d(city))} onInfo={onHowItWorks} infoLabel={t('howItWorks')} checked={nowOn} onChange={optIn} />
          : <NowToggleRow className="dates-sheet__now-row" title={t('tonightTitle')} note={awayTime && t('tipNowBody', timeLabel(awayTime), t.d(city))} linkLabel={t('howItWorks')} onLink={onHowItWorks} checked={nowOn} onChange={optIn} />)}
        {variant === 'a' && nowOn && (
          <NightTip arrow="none" className="dates-sheet__now" title={t('tipOnTitle')} body={t('tipOnBody')} linkLabel={t('removeNow')} onLink={() => optIn(false)} />
        )}
        {true /* settled: date fields */ ? (
          // Date fields: check-in and check-out as two bordered cells; the one being picked next is outlined in aqua
          <div className="dates-sheet__fields">
            <div className={`dates-sheet__field ${!range.start || range.end ? 'is-active' : ''}`}>
              <WidgetField variant="populated" label={t('checkIn')} value={fmtDay(nowView ? today : range.start)} />
            </div>
            <div className={`dates-sheet__field ${range.start && !range.end ? 'is-active' : ''}`}>
              {range.end
                ? <WidgetField variant="populated" label={t('checkOut')} value={fmtDay(range.end)} />
                : <WidgetField variant="empty" label={t('checkOut')} />}
            </div>
          </div>
        ) : nowView && range.end ? (
          // Opted in: one line, starting now and ending at check-out time
          <span className="t-body"><b>{t('nowStart')} – {fmtDay(range.end)} • {t('checkOutTime')}</b> {t('stayDays', Math.round((range.end - range.start) / 864e5))}</span>
        ) : (
          <span className="t-body">{sum ? <><b>{sum.dates}</b> {sum.nights}</> : t('selectCheckout')}</span>
        )}
        <Button variant="primary" label={t('confirm')} disabled={!range.end} onClick={() => onConfirm(range.start, range.end, nowView)} />
      </div>
    </BottomSheet>
  )
}


// 1.2a How it works? — opened from the check-in tonight row (widget and calendar footer)
export function HowItWorksSheet({ open, onClose }) {
  const t = useCopy()
  const rows = [[I.clockForward, 'howWindow'], [I.lightningLine, 'howInstant'], [I.door, 'howCheckout']]
  return (
    <BottomSheet className="how-sheet-wrap" open={open} size="medium" onClose={onClose}>
      <HowHero eyebrow={t('howEyebrow')} title={t('howHeroTitle')} />
      <div className="how-sheet">
        <h3 className="t-subtitle t-reset how-sheet__heading">{t('howHeading')}</h3>
        {rows.map(([icon, k], i) => (
          <Cell dir={t.dir} key={k} visual="icon" icon={<Icon svg={icon} />} label={t(`${k}Title`)} subtext={t(`${k}Body`)} trailing="none" showSeparator={i < rows.length - 1} />
        ))}
        <Button variant="primary" label={t('gotIt')} onClick={onClose} />
      </div>
    </BottomSheet>
  )
}

// 1.3
let roomSeq = 0
const withIds = (rooms) => rooms.map((r) => ({ ...r, id: r.id ?? ++roomSeq }))

export function GuestsSheet({ open, onClose, onApply }) {
  const t = useCopy()
  const { search } = useStay()
  const [rooms, setRooms] = useState(() => withIds(search.rooms))
  const [full, setFull] = useState(false)
  useEffect(() => { if (open) setRooms(withIds(search.rooms)) }, [open, search.rooms])

  const update = (i, { adults, children }) => setRooms((rs) => rs.map((r, j) => j !== i ? r : {
    ...r, adults, children, ages: Array.from({ length: children }, (_, k) => r.ages[k] ?? 5),
  }))
  const bumpAge = (i, k) => setRooms((rs) => rs.map((r, j) => j !== i ? r : { ...r, ages: r.ages.map((a, m) => m === k ? (a + 1) % 12 : a) }))

  return (
    <BottomSheet open={open} size="fullscreen" title={t('guests')} onClose={onClose}>
      <div className="guests-sheet">
        <p className="t-body t-reset guests-sheet__note">{t('maxGuests')}</p>
        {rooms.map((r, i) => (
          <div key={r.id} className="guests-sheet__room">
            <MultiSelection type="room" title={`${t('room')} ${i + 1}`} initialValues={{ adults: r.adults, children: r.children }}
              onChange={(v) => update(i, v)} onMaxReached={() => setFull(true)}
              onRemove={rooms.length > 1 ? () => setRooms((rs) => rs.filter((_, j) => j !== i)) : undefined} />
            {r.ages.length > 0 && (
              <div className="guests-sheet__ages">
                {r.ages.map((a, k) => <Chip key={k} label={t('childAge', k + 1, a)} dropdown onClick={() => bumpAge(i, k)} />)}
              </div>
            )}
          </div>
        ))}
        <Button className="guests-sheet__add" variant="secondary" size="medium" label={t('addRoom')} leadingIcon={<Icon svg={I.plusCircle} />}
          onClick={() => setRooms((rs) => [...rs, { id: ++roomSeq, adults: 1, children: 0, ages: [] }])} />
        <div className="guests-sheet__foot">
          <Button variant="primary" label={t('apply')} onClick={() => onApply(rooms.map(({ id, ...r }) => r))} />
        </div>
      </div>
      {full && <Dialog title={t('maxGuests')} primaryAction={{ label: t('ok'), onClick: () => setFull(false) }} onClose={() => setFull(false)} />}
    </BottomSheet>
  )
}
