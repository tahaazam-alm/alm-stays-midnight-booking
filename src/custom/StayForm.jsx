// CUSTOM: not in the design system — SearchWidget's Stays product owns its own state and has no
// hooks to open host pickers, so this composes the same pieces (WidgetField + Separator in a card).
import { WidgetField, Separator } from 'design-system'
import { NowToggleRow } from './NowToggleRow.jsx'
import { Icon } from '../shell/Icon.jsx'
import * as I from '../icons.js'
import { useCopy } from '../copy.js'
import { useProto } from '../shell/PrototypeShell.jsx'
import { fmtFull, guestsLabel } from '../logic.js'
import './StayForm.css'

// `checkInField` / `checkOutField` override a date cell's label/value/subtext (instant check-in explorations).
// `datesTip` renders under the date row, pointing up at it (A's check-in now tooltip, B's toggle banner).
// `nowRow` ({ title, linkLabel, onLink, checked, onChange }) adds a widget row with a toggle under the dates (B · row in widget).
// `nowOn` sets the check-in value in bold. `nowRow` is tinted on its own while off; once on, the tint covers the dates block too
// (`nowRow.navy`: the row turns navy on its own instead).
export function StayForm({ search, checkInField, checkOutField, datesTip, nowRow, nowOn, onDest, onDates, onGuests, children }) {
  const t = useCopy()
  const { dir } = useProto()
  return (
    <div className={`stay-form ${nowOn ? 'stay-form--now-on' : ''}`}>
      <WidgetField variant="populated" label={t('destination')} value={t.d(search.dest.name)} icon={<Icon svg={I.pin} />} onPress={onDest} />
      <Separator className="stay-form__sep" />
      <div className={`stay-form__night night-tint ${nowRow?.checked && !nowRow.navy ? 'is-on' : ''}`}>
      <div className="stay-form__dates">
        <WidgetField variant="populated" label={t('checkIn')} value={fmtFull(search.checkIn)} icon={<Icon svg={I.calendar} />} onPress={onDates} {...checkInField} />
        <span className="stay-form__arrow"><Icon svg={dir === 'rtl' ? I.chevronLeft : I.chevronRight} size={20} /></span>
        <WidgetField variant="populated" label={t('checkOut')} value={fmtFull(search.checkOut)} onPress={onDates} {...checkOutField} />
      </div>
      {datesTip && <div className="stay-form__tip">{datesTip}</div>}
      {nowRow && <NowToggleRow className="stay-form__now" tinted={!nowRow.checked} {...nowRow} />}
      </div>
      <Separator className="stay-form__sep" />
      <WidgetField variant="populated" label={t('guests')} value={guestsLabel(search.rooms)} icon={<Icon svg={I.usersTwo} />} onPress={onGuests} />
      {children && <div className="stay-form__foot">{children}</div>}
    </div>
  )
}
