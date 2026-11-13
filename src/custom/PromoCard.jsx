// CUSTOM: not in the design system — hotel deal card on the booking confirmation: a tag sitting on the card's top edge,
// an icon, the offer with its code, and a button. The design-system Banner has no tag or button.
import { Tag, LegacyButton } from 'design-system'
import { Icon } from '../shell/Icon.jsx'
import './type.css'
import './PromoCard.css'

export function PromoCard({ tag, icon, title, body, codeLabel, code, actionLabel, onAction }) {
  return (
    <div className="promo-card">
      {tag && <span className="promo-card__tag"><Tag label={tag} variant="warning" style="filled" /></span>}
      <Icon svg={icon} size={24} />
      <div className="promo-card__text">
        <h3 className="t-subtitle t-reset">{title}</h3>
        <p className="t-body t-reset">{body}</p>
        <p className="t-body t-reset">{codeLabel}: <strong className="t-body-semi">{code}</strong></p>
        <span className="promo-card__action"><LegacyButton variant="secondary" size="small" label={actionLabel} onClick={onAction} /></span>
      </div>
    </div>
  )
}
