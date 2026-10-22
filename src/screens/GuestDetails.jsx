// 4 · Guest details
import { useState } from 'react'
import { Navbar, Chip, TextInput, ListItem, Cell, LegacyBottomActionBar } from 'design-system'
import { useNav } from '../shell/navigation.jsx'
import { Icon } from '../shell/Icon.jsx'
import { useStay } from '../state.jsx'
import { useCopy } from '../copy.js'
import { SHUKRANS } from '../data.js'
import { money } from '../logic.js'
import { BookingSummary } from '../custom/BookingSummary.jsx'
import * as I from '../icons.js'
import '../custom/type.css'
import './Funnel.css'

export default function GuestDetails() {
  const nav = useNav()
  const t = useCopy()
  const { search, booking } = useStay()
  const [f, setF] = useState({ title: 'Mr', first: 'Taha', last: 'Azam', email: 'taha.azam@almosafer.com', code: '+971', phone: '50 334 2582', other: false })
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }))
  const total = (booking.rate?.price ?? booking.hotel.price) * 0.99727

  return (
    <div className="screen funnel">
      <div className="screen__nav"><Navbar toolbar={{ title: t('guestDetails'), onBack: () => nav.back() }} /></div>
      <div className="screen__body funnel__body">
        <BookingSummary hotel={booking.hotel} search={search} />
        <section className="funnel__section">
          <h2 className="t-title t-reset">{t('contactDetails')}</h2>
          <div className="funnel__card">
            <div className="funnel__titles">
              {['Mr', 'Ms', 'Mrs'].map((x) => <Chip key={x} label={x} selected={f.title === x} onClick={() => setF((s) => ({ ...s, title: x }))} />)}
            </div>
            <TextInput label="First name" value={f.first} onChange={set('first')} />
            <TextInput label="Last name" value={f.last} onChange={set('last')} />
            <TextInput label="Email" value={f.email} onChange={set('email')} />
            <div className="funnel__phone">
              <TextInput label="Code" value={f.code} onChange={set('code')} dropdown />
              <TextInput label="Phone number" value={f.phone} onChange={set('phone')} />
            </div>
          </div>
          <p className="t-caption t-subtext t-reset funnel__center">{t('voucherNote')}</p>
        </section>
        <div className="funnel__card funnel__card--row">
          <ListItem type="checkbox" label={t('someoneElse')} selected={f.other} onChange={() => setF((s) => ({ ...s, other: !s.other }))} />
        </div>
        <div className="funnel__card funnel__card--row">
          <Cell visual={null} label={t('specialRequests')} showSeparator={false} />
        </div>
        <section className="funnel__section">
          <div>
            <h2 className="t-title t-reset">{t('rewardTitle')}</h2>
            <p className="t-caption t-subtext t-reset">{t('rewardSub')}</p>
          </div>
          <div className="funnel__card funnel__card--row">
            <Cell visual="icon" icon={<Icon svg={I.reward} />} label="Shukrans" tag={SHUKRANS.toLocaleString('en-US')} sideIcon={<Icon svg={I.info} />} trailing="none" showSeparator={false} />
          </div>
        </section>
      </div>
      <div className="funnel__bar">
        <LegacyBottomActionBar type="funnel" price={money(total, 2)} expander={false} linkLabel={t('priceBreakdown')} onLink={() => {}}
          actionLabel={t('continue')} onAction={() => nav.push('pay', { total })} />
      </div>
    </div>
  )
}
