// 5 · Confirm and pay
import { useState } from 'react'
import { Navbar, Cell, BottomActionBar, Dialog } from 'design-system'
import { useNav } from '../shell/navigation.jsx'
import { Icon } from '../shell/Icon.jsx'
import { useProto } from '../shell/PrototypeShell.jsx'
import { useStay } from '../state.jsx'
import { useCopy } from '../copy.js'
import { money } from '../logic.js'
import { BookingSummary } from '../custom/BookingSummary.jsx'
import { PayMethods } from '../custom/PayMethods.jsx'
import * as I from '../icons.js'
import '../custom/type.css'
import './Funnel.css'

export default function Pay({ total = 0 }) {
  const nav = useNav()
  const t = useCopy()
  const { restart, controls } = useProto()
  const { search, booking, nowOn } = useStay()
  const [method, setMethod] = useState('apple')
  const [done, setDone] = useState(false)

  return (
    <div className="screen funnel">
      <div className="screen__nav"><Navbar toolbar={{ title: t('confirmPay'), onBack: () => nav.back() }} /></div>
      <div className="screen__body funnel__body">
        <BookingSummary hotel={booking.hotel} search={search} now={nowOn && controls.paySummary} />
        <section className="funnel__section">
          <h2 className="t-title t-reset">{t('payWith')}</h2>
          <PayMethods value={method} onChange={setMethod} />
        </section>
        <section className="funnel__section">
          <h2 className="t-title t-reset">{t('rewardOrVoucher')}</h2>
          <div className="funnel__card funnel__card--row">
            <Cell dir={t.dir} visual="icon" icon={<Icon svg={I.ticket} />} label={t('voucherCode')} value={t('add')} showSeparator={false} />
          </div>
        </section>
        <p className="t-caption t-subtext t-reset funnel__center">
          {t('termsPre')}<span className="t-link">{t('privacy')}</span>{t('termsMid')}<span className="t-link">{t('terms')}</span>{t('termsPost')}
        </p>
        <p className="t-caption t-subtext t-reset funnel__center funnel__safe"><Icon svg={I.shield} size={16} />{t('safe')}</p>
      </div>
      <div className="funnel__bar funnel__bar--float">
        <BottomActionBar type="payment" price={money(total, 2)} actionLabel={t('pay')} onAction={() => setDone(true)} cardArt={false} />
      </div>
      {done && (
        <Dialog title={t('endTitle')} description={t('endBody')}
          primaryAction={{ label: t('restart'), onClick: restart }}
          secondaryAction={{ label: t('close'), onClick: () => setDone(false) }} onClose={() => setDone(false)} />
      )}
    </div>
  )
}
