// CUSTOM: not in the design system — payment method tiles on Confirm and Pay.
import { Icon } from '../shell/Icon.jsx'
import * as I from '../icons.js'
import { useCopy } from '../copy.js'
import './PayMethods.css'

const METHODS = [
  { id: 'apple', label: 'Apple Pay', logo: I.applePay }, // brand names stay as written
  { id: 'card', labelKey: 'card', icon: I.card },
  { id: 'tamara', label: 'Tamara', logo: I.tamara, badgeKey: 'payIn12' },
  { id: 'tabby', label: 'Tabby', logo: I.tabby, badgeKey: 'payIn12' },
]

export function PayMethods({ value, onChange }) {
  const t = useCopy()
  return (
    <div className="pay-methods" role="radiogroup">
      {METHODS.map((m) => (
        <button key={m.id} type="button" role="radio" aria-checked={value === m.id} className={`pay-method ${value === m.id ? 'is-on' : ''}`} onClick={() => onChange(m.id)}>
          {m.badgeKey && <span className="pay-method__badge t-meta-semi">{t(m.badgeKey)}</span>}
          {m.logo ? <img className="pay-method__logo" src={m.logo} alt="" /> : <Icon svg={m.icon} size={28} />}
          <span className="t-caption">{m.labelKey ? t(m.labelKey) : m.label}</span>
        </button>
      ))}
    </div>
  )
}
