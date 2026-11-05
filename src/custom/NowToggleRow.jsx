// CUSTOM: not in the design system — a toggle row with icon, title and a link; the library's Toggle
// has no row layout with a leading icon, and the whole row needs to be tappable (check-in now, B · row).
// `linkLabel` / `onLink` add a link under the title ("How it works?"); `tinted` gives the row itself the night tint.
// `note`: a caption-size line in subtext colour (the destination's local time when it's in another time zone).
// `navy` (Navy on select): an info button after the title instead of the link, `subtext` under it, and the row turns navy once on.
import { Toggle } from 'design-system'
import { Icon } from '../shell/Icon.jsx'
import * as I from '../icons.js'
import './NowToggleRow.css'

export function NowToggleRow({ title, subtext, note, linkLabel, onLink, onInfo, infoLabel, checked, onChange, tinted, navy, className = '' }) {
  return (
    <div className={`now-row night-tint ${tinted ? 'is-on' : ''} ${navy ? 'now-row--navy' : ''} ${navy && checked ? 'is-navy' : ''} ${className}`}
      onClick={(e) => { if (!e.target.closest('.toggle, .now-row__link, .now-row__info')) onChange(!checked) }}>
      <span className="now-row__icon"><Icon svg={I.night} /></span>
      <span className="now-row__text">
        <span className="now-row__title">
          <span className="t-body">{title}</span>
          {onInfo && <button type="button" className="now-row__info" aria-label={infoLabel} onClick={onInfo}><Icon svg={I.info} /></button>}
        </span>
        {subtext && <span className="now-row__sub t-body">{subtext}</span>}
        {note && <span className="now-row__note t-caption">{note}</span>}
        {linkLabel && <button type="button" className="now-row__link t-body-semi t-link" onClick={onLink}>{linkLabel}</button>}
      </span>
      <Toggle label="" aria-label={title} checked={checked} onChange={(e) => onChange(e.target.checked)} />
    </div>
  )
}
