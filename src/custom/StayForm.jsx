// CUSTOM: not in the design system — SearchWidget's Stays product owns its own state and has no
// hooks to open host pickers, so this composes the same pieces (WidgetField + Separator in a card).
import { WidgetField, Separator } from 'design-system'
import { Icon } from '../shell/Icon.jsx'
import * as I from '../icons.js'
import { useCopy } from '../copy.js'
import { useProto } from '../shell/PrototypeShell.jsx'
import { fmtFull, guestsLabel } from '../logic.js'
import './StayForm.css'

export function StayForm({ search, onDest, onDates, onGuests, children }) {
  const t = useCopy()
  const { dir } = useProto()
  return (
    <div className="stay-form">
      <WidgetField variant="populated" label={t('destination')} value={search.dest.name} icon={<Icon svg={I.pin} />} onPress={onDest} />
      <Separator className="stay-form__sep" />
      <div className="stay-form__dates">
        <WidgetField variant="populated" label={t('checkIn')} value={fmtFull(search.checkIn)} icon={<Icon svg={I.calendar} />} onPress={onDates} />
        <span className="stay-form__arrow"><Icon svg={dir === 'rtl' ? I.chevronLeft : I.chevronRight} size={20} /></span>
        <WidgetField variant="populated" label={t('checkOut')} value={fmtFull(search.checkOut)} onPress={onDates} />
      </div>
      <Separator className="stay-form__sep" />
      <WidgetField variant="populated" label={t('guests')} value={guestsLabel(search.rooms)} icon={<Icon svg={I.usersTwo} />} onPress={onGuests} />
      {children && <div className="stay-form__foot">{children}</div>}
    </div>
  )
}
