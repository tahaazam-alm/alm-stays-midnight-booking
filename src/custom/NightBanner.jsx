// CUSTOM: not in the design system — SystemBanner has no night/teal type and only a link action. Branded
// "instant check-in" banner and tag for the check-in now explorations: a moon + lightning mark on the aqua (teal) scale.
// `tone`: 'filled' for the offer (search, calendar), 'tinted' for the confirmations on later screens.
import { LegacyButton, Toggle, SystemBanner } from 'design-system'
import { Icon } from '../shell/Icon.jsx'
import * as I from '../icons.js'
import './NightBanner.css'

// SystemBanner's icon is fixed per type, so the moon banner masks its slot with the DS moon (results, hotel rooms)
const MOON = `url("data:image/svg+xml,${encodeURIComponent(I.night)}")`
export function MoonBanner({ text, description, className = '' }) {
  return <div className={`moon-banner ${className}`} style={{ '--moon-banner-icon': MOON }}><SystemBanner type="neutral" title={text} description={description} /></div>
}

export function NightMark({ size = 40 }) {
  return (
    <span className="night-mark" style={{ width: size, height: size }} aria-hidden="true">
      <Icon svg={I.night} size={Math.round(size * 0.6)} />
      <span className="night-mark__bolt"><Icon svg={I.lightning} size={12} /></span>
    </span>
  )
}

export function NightBanner({ tone = 'tinted', title, body, actionLabel, onAction, linkLabel, onLink }) {
  return (
    <div className={`night-banner night-banner--${tone}`}>
      <NightMark />
      <div className="night-banner__text">
        <p className="t-body-semi t-reset">{title}</p>
        {body && <p className="t-caption t-reset night-banner__body">{body}</p>}
        {(actionLabel || linkLabel) && (
          <div className="night-banner__actions">
            {actionLabel && <LegacyButton variant={tone === 'filled' ? 'reversed' : 'secondary'} size="small" label={actionLabel} onClick={onAction} />}
            {linkLabel && <button type="button" className="night-banner__link t-caption-semi" onClick={onLink}>{linkLabel}</button>}
          </div>
        )}
      </div>
    </div>
  )
}

export function NightTag({ label }) {
  return <span className="night-tag t-caption-semi"><Icon svg={I.lightning} size={12} />{label}</span>
}

// Compact dark-teal tooltip that points at the dates (the check-in now offer). `arrow` is the side the caret
// sits on; the caller positions it. `action` is a pill button, `link` a quiet text link (e.g. Remove).
// `pulse` runs a glowing point once around the stroke, then flashes the background, when it appears.
// `toggle` ({ checked, onChange }) puts a DS Toggle at the end instead of an action (exploration B).
export function NightTip({ arrow = 'top', title, body, actionLabel, onAction, linkLabel, onLink, toggle, pulse, className = '' }) {
  return (
    <div className={`night-tip night-tip--${arrow} ${pulse ? 'night-tip--pulse' : ''} ${toggle ? 'night-tip--toggle' : ''} ${className}`} role="note">
      {pulse && <span className="night-tip__orbit" aria-hidden="true"><i /></span>}
      <Icon svg={I.night} size={20} />
      <div className="night-tip__text">
        <p className="t-body-semi t-reset">{title}</p>
        {body && <p className="t-body t-reset night-tip__body">{body}</p>}
      </div>
      {actionLabel && <button type="button" className="night-tip__action t-body-semi" onClick={onAction}><Icon svg={I.lightning} size={14} />{actionLabel}</button>}
      {linkLabel && <button type="button" className="night-tip__link t-body-semi" onClick={onLink}>{linkLabel}</button>}
      {toggle && <Toggle className="night-tip__toggle" label="" aria-label={title} checked={toggle.checked} onChange={(e) => toggle.onChange(e.target.checked)} />}
    </div>
  )
}
