// 6 · Booking confirmed: a full-height bottom sheet over Home, opened after Pay. The X closes it to Home; Booking details opens the booking.
import { BottomSheet, LegacyButton, AdBanner, Cell } from 'design-system'
import { useNav } from '../shell/navigation.jsx'
import { Icon } from '../shell/Icon.jsx'
import { useStay } from '../state.jsx'
import { useCopy } from '../copy.js'
import { SHUKRANS } from '../data.js'
import { money, fmtRange } from '../logic.js'
import emirates from '@ds-icons/airline-logos/EK.svg'
import { PromoCard } from '../custom/PromoCard.jsx'
import * as I from '../icons.js'
import '../custom/type.css'
import './Funnel.css'
import './AfterBooking.css'

export function ConfirmedSheet({ open, onClose, onSoon: soon }) {
  const nav = useNav()
  const t = useCopy()
  const { booked } = useStay()

  return (
    <BottomSheet open={open} size="fullscreen" title={t('bookingConfirmed')} onClose={onClose} dir={t.dir}>
      <div className="funnel after after__sheet">
        <div className="after__hero">
          <div className="after__badge">
            <img src={booked.hotel.image} alt="" />
            <span className="after__tick"><Icon svg={I.check} size={24} /></span>
          </div>
          <h2 className="t-title t-reset">{t('bookingIsConfirmed')}</h2>
          <p className="t-body t-subtext t-reset">{t.d(booked.hotel.name)}</p>
          <p className="t-body t-subtext t-reset">{fmtRange(booked.checkIn, booked.checkOut)}</p>
          {booked.tonight && <p className="t-caption t-subtext t-reset after__tonight"><Icon svg={I.night} size={16} />{t('tonightBetween')}</p>}
          <LegacyButton variant="ghost" size="small" label={t('bookingDetails')} onClick={() => nav.push('details')} />
        </div>

        <section className="funnel__section">
          <h2 className="t-title t-reset">{t('completeTrip')}</h2>
          <PromoCard tag={t('promoTag')} icon={I.bed} title={t('promoTitle')} body={t('promoBody')} codeLabel={t('useCode')} code="CSSTAY12" actionLabel={t('moreDeals')} onAction={soon} />
          <AdBanner dir={t.dir} layout="mobile" size="small" logoSrc={emirates} title={t('adTitle')} subtitle={t('adBody')} onClick={soon} />
        </section>

        <section className="funnel__section">
          <h2 className="t-title t-reset">{t('addOns')}</h2>
          <div className="funnel__card funnel__card--row">
            <Cell dir={t.dir} visual="3d-icon" iconSrc={I.addonTransfer} label={t('addonTransfer')} subtext={t('addonTransferBody')} showSeparator={false} onClick={soon} />
          </div>
          <div className="funnel__card funnel__card--row">
            <Cell dir={t.dir} visual="3d-icon" iconSrc={I.addonBreakfast} label={t('addonBreakfast')} subtext={t('addonBreakfastBody')} showSeparator={false} onClick={soon} />
          </div>
        </section>

        <section className="funnel__section">
          <h2 className="t-title t-reset">{t('rewards')}</h2>
          <div className="funnel__card">
            <Cell dir={t.dir} visual="icon" icon={<Icon svg={I.reward} />} label={t('shukranPoints', SHUKRANS.toLocaleString('en-US'))} trailing="none" />
            <p className="t-caption t-subtext t-reset">{t('rewardsNote')}</p>
          </div>
        </section>

        <section className="funnel__section">
          <h2 className="t-title t-reset">{t('moreInfo')}</h2>
          <div>
            <Cell dir={t.dir} visual="icon" icon={<Icon svg={I.card} />} label={t('paymentDetails')} subtext={t('totalVat', money(booked.total, 2))} onClick={soon} />
            <Cell dir={t.dir} visual="icon" icon={<Icon svg={I.question} />} label={t('faqs')} subtext={t('faqsBody')} onClick={soon} />
            <Cell dir={t.dir} visual="icon" icon={<Icon svg={I.headset} />} label={t('needHelp')} showSeparator={false} onClick={soon} />
          </div>
        </section>
      </div>
    </BottomSheet>
  )
}
