// 1.1 destination · 1.2 dates · 1.3 guests — the pickers opened from the search card.
import { useEffect, useState } from 'react'
import { BottomSheet, Search, Cell, Button, MultiSelection, Chip, Dialog } from 'design-system'
import { Icon } from '../shell/Icon.jsx'
import { useStay } from '../state.jsx'
import { useCopy } from '../copy.js'
import { RECENT_DESTINATIONS, POPULAR_CITIES } from '../data.js'
import { earliestCheckIn, rangeSummary } from '../logic.js'
import { RangeCalendar } from '../custom/RangeCalendar.jsx'
import * as I from '../icons.js'

// 1.1
export function DestinationSheet({ open, onClose, onPick }) {
  const t = useCopy()
  const [q, setQ] = useState('')
  useEffect(() => { if (open) setQ('') }, [open])
  const match = (d) => !q || `${d.name} ${d.region}`.toLowerCase().includes(q.toLowerCase())
  const row = (d, icon) => (
    <Cell key={d.name} visual="icon" icon={<Icon svg={icon} />} label={d.name} subtext={d.region} trailing="none" onClick={() => onPick(d)} />
  )
  return (
    <BottomSheet open={open} size="fullscreen" title={t('searchDestination')} onClose={onClose}
      search={<Search value={q} onChange={(e) => setQ(e.target.value)} onClear={() => setQ('')} placeholder={t('whereTo')} />}>
      <div className="sheet-list">
        <Cell visual="icon" icon={<Icon svg={I.navArrow} />} label={t('autoDetect')} trailing="none" showSeparator={false} />
        <div className="sheet-eyebrow"><span className="t-subtitle">{t('recent')}</span><span className="t-subtitle t-link">{t('clear')}</span></div>
        {RECENT_DESTINATIONS.filter(match).map((d) => row(d, I.history))}
        <div className="sheet-eyebrow"><span className="t-subtitle">{t('popularCities')}</span></div>
        {POPULAR_CITIES.filter(match).map((d) => row(d, I.pin))}
      </div>
    </BottomSheet>
  )
}

// 1.2
export function DatesSheet({ open, onClose, onConfirm }) {
  const t = useCopy()
  const { now, search } = useStay()
  const [range, setRange] = useState({ start: search.checkIn, end: search.checkOut })
  useEffect(() => { if (open) setRange({ start: search.checkIn, end: search.checkOut }) }, [open, search.checkIn, search.checkOut])
  const sum = range.end && rangeSummary(range.start, range.end)
  return (
    <BottomSheet open={open} size="fullscreen" title={t('selectDates')} onClose={onClose}>
      <RangeCalendar start={range.start} end={range.end} minDate={earliestCheckIn(now)} onChange={(start, end) => setRange({ start, end })} />
      <div className="dates-sheet__foot">
        <span className="t-body">{sum ? <><b>{sum.dates}</b> {sum.nights}</> : 'Select a check-out date'}</span>
        <Button variant="primary" label={t('confirm')} disabled={!range.end} onClick={() => onConfirm(range.start, range.end)} />
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
                {r.ages.map((a, k) => <Chip key={k} label={`Child ${k + 1}: ${a} year${a === 1 ? '' : 's'}`} dropdown onClick={() => bumpAge(i, k)} />)}
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
      {full && <Dialog title={t('maxGuests')} primaryAction={{ label: 'OK', onClick: () => setFull(false) }} onClose={() => setFull(false)} />}
    </BottomSheet>
  )
}
