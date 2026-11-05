// CUSTOM: not in the design system — no full-width sticky status band. Results "band" version: a navy strip
// with the moon pinned under the header, the header and the list both rounding into it.
import { Icon } from '../shell/Icon.jsx'
import * as I from '../icons.js'
import './NightBand.css'

export function NightBand({ text }) {
  return (
    <div className="night-band" role="status">
      <Icon svg={I.night} size={24} />
      <span className="night-band__text">{text}</span>
    </div>
  )
}
