// 9 · Your booking: the confirmed stay, its reference numbers, add-ons and the way into Manage booking.
import { useState } from 'react'
import { Navbar, Tag, Cell, LegacyButton, Separator, Snackbar } from 'design-system'
import { useNav } from '../shell/navigation.jsx'
import { Icon } from '../shell/Icon.jsx'
import { useStay } from '../state.jsx'
import { useCopy } from '../copy.js'
import { money, fmtFullRange, guestCount } from '../logic.js'
import * as I from '../icons.js'
import '../custom/type.css'
import './Funnel.css'
import './AfterBooking.css'

export default function BookingDetails() {
  const nav = useNav()
  const t = useCopy()
  const { booked } = useStay()
  const [toast, setToast] = useState('')
  const soon = () => setToast(t('notBuilt'))
  const chevron = t.dir === 'rtl' ? I.chevronLeft : I.chevronRight
  const ref = (label) => (
    <div className="after__ref">
      <span className="t-caption t-subtext after__ref-label">{label}<Icon svg={I.info} size={16} /></span>
      <span className="after__ref-row">
        <b className="t-title after__num">{booked.id}</b>
        <button type="button" className="after__link t-subtitle t-link" onClick={() => setToast(t('copied'))}>{t('copy')}</button>
      </span>
    </div>
  )

  return (
    <div className="screen funnel after">
      <div className="screen__nav"><Navbar toolbar={{ title: t('yourBooking'), onBack: () => nav.back() }} /></div>
      <div className="screen__body funnel__body">
        <div className="funnel__card after__booking">
          <span><Tag label={t('confirmed')} variant="success" style="filled" /></span>
          <button type="button" className="after__hotel" onClick={soon}>
            <img src={booked.hotel.image} alt="" />
            <span className="t-title">{t.d(booked.hotel.name)}</span>
            <Icon svg={chevron} size={20} />
          </button>
          <Separator />
          <ul className="after__facts t-body">
            <li><Icon svg={I.calendar} />{fmtFullRange(booked.checkIn, booked.checkOut)}</li>
            {booked.tonight && <li><Icon svg={I.night} />{t('tonightBetween')}</li>}
            <li><Icon svg={I.bed} />{t('roomsAdults', booked.search.rooms.length, guestCount(booked.search.rooms))}</li>
          </ul>
          <Separator />
          {ref(t('almosaferId'))}
          <Separator />
          {ref(t('propertyConfirmation'))}
        </div>

        <section className="funnel__section">
          <h2 className="t-title t-reset">{t('enhance')}</h2>
          <div className="funnel__card funnel__card--row">
            <Cell dir={t.dir} visual="3d-icon" iconSrc={I.addonTransfer} label={t('addonTransfer')} subtext={t('addonTransferBody')} showSeparator={false} onClick={soon} />
          </div>
          <div className="funnel__card funnel__card--row">
            <Cell dir={t.dir} visual="3d-icon" iconSrc={I.addonBreakfast} label={t('addonBreakfast')} subtext={t('addonBreakfastBody')} showSeparator={false} onClick={soon} />
          </div>
        </section>

        <div className="funnel__card">
          <Cell dir={t.dir} visual="icon" icon={<Icon svg={I.ticket} />} label={t('viewVoucher')} onClick={soon} />
          <LegacyButton variant="secondary" label={t('manageBooking')} onClick={() => nav.push('manage')} />
        </div>

        <section className="funnel__section">
          <h2 className="t-title t-reset">{t('moreInfo')}</h2>
          <div>
            <Cell dir={t.dir} visual="icon" icon={<Icon svg={I.card} />} label={t('priceBreakdown')} subtext={t('youPaid', money(booked.total, 2))} onClick={soon} />
            <Cell dir={t.dir} visual="icon" icon={<Icon svg={I.headset} />} label={t('needHelp')} showSeparator={false} onClick={soon} />
          </div>
        </section>
      </div>
      <Snackbar message={toast} show={!!toast} onClose={() => setToast('')} />
    </div>
  )
}
