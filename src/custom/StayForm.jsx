// CUSTOM: not in the design system — SearchWidget's Stays product owns its own state and has no
// hooks to open host pickers, so this composes the same pieces (WidgetField + Separator in a card).
import { useEffect, useState } from 'react'
import { WidgetField, Separator } from 'design-system'
import { NowToggleRow } from './NowToggleRow.jsx'
import { Icon } from '../shell/Icon.jsx'
import * as I from '../icons.js'
import { useCopy } from '../copy.js'
import { useProto } from '../shell/PrototypeShell.jsx'
import { fmtFull, guestsLabel } from '../logic.js'
import { useStay } from '../state.jsx'
import './StayForm.css'

// `checkInField` / `checkOutField` override a date cell's label/value/subtext (instant check-in explorations).
// `datesTip` renders under the date row, pointing up at it (A's check-in now tooltip, B's toggle banner).
// `nowRow` ({ title, linkLabel, onLink, checked, onChange }) adds a widget row with a toggle under the dates (B · row in widget).
// `nowOn` sets the check-in value in bold. `nowRow` is tinted on its own while off; once on, the tint covers the dates block too
// (`nowRow.navy`: the row turns navy on its own instead).
// `nowReveal` (Tonight transition · 'reveal' = Shimmer + reveal, 'shimmer' = Shimmer only, row there from the start): the row is plain, opens a second after the form mounts with a band of light
// across it, and nothing is tinted once on. Already on at mount (coming back to search): the row is simply there.
export function StayForm({ search, checkInField, checkOutField, datesTip, nowRow, nowReveal, nowOn, onDest, onDates, onGuests, children }) {
  const { shownCheckIn } = useStay()
  const t = useCopy()
  const { dir } = useProto()
  const [arrived, setArrived] = useState(() => !!nowRow?.checked) // true from the start: no entrance to play
  const [fresh, setFresh] = useState(false)
  const [wasOff] = useState(() => !nowRow?.checked)
  const only = nowReveal === 'shimmer'
  const band = only && wasOff && !fresh // Shimmer only: the row is already there, just the band of light
  useEffect(() => {
    if (nowReveal !== 'reveal' || arrived) return
    const id = setTimeout(() => { setArrived(true); setFresh(true) }, 1000)
    return () => clearTimeout(id)
  }, [nowReveal, arrived])
  const row = nowRow && <NowToggleRow className="stay-form__now" tinted={!nowReveal && !nowRow.checked} {...nowRow} />
  return (
    <div className={`stay-form ${nowOn ? 'stay-form--now-on' : ''}`}>
      <WidgetField variant="populated" label={t('destination')} value={t.d(search.dest.name)} icon={<Icon svg={I.pin} />} onPress={onDest} />
      <Separator className="stay-form__sep" />
      <div className={`stay-form__night night-tint ${nowRow?.checked && !nowRow.navy && !nowReveal ? 'is-on' : ''}`}>
      <div className="stay-form__dates">
        <WidgetField variant="populated" label={t('checkIn')} value={fmtFull(shownCheckIn)} icon={<Icon svg={I.calendar} />} onPress={onDates} {...checkInField} />
        <span className="stay-form__arrow"><Icon svg={dir === 'rtl' ? I.chevronLeft : I.chevronRight} size={20} /></span>
        <WidgetField variant="populated" label={t('checkOut')} value={fmtFull(search.checkOut)} onPress={onDates} {...checkOutField} />
      </div>
      {datesTip && <div className="stay-form__tip">{datesTip}</div>}
      {nowReveal && nowRow
        ? <div className={`stay-form__reveal ${arrived || only ? 'is-shown' : ''} ${fresh ? 'is-fresh' : ''} ${band ? 'is-band' : ''}`} inert={!(arrived || only) || undefined}><div><Separator className="stay-form__sep" />{row}</div></div>
        : row}
      </div>
      <Separator className="stay-form__sep" />
      <WidgetField variant="populated" label={t('guests')} value={guestsLabel(search.rooms)} icon={<Icon svg={I.usersTwo} />} onPress={onGuests} />
      {children && <div className="stay-form__foot">{children}</div>}
    </div>
  )
}
