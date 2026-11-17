// 10 · Manage booking: the stay recap, online cancellation and ways to reach support.
import { useState } from 'react'
import { Navbar, Tag, Cell, LegacyButton, Separator, Snackbar } from 'design-system'
import { useNav } from '../shell/navigation.jsx'
import { Icon } from '../shell/Icon.jsx'
import { useStay } from '../state.jsx'
import { useCopy } from '../copy.js'
import { fmtFull, addDays } from '../logic.js'
import { BookingSummary } from '../custom/BookingSummary.jsx'
import * as I from '../icons.js'
import '../custom/type.css'
import './Funnel.css'
import './AfterBooking.css'

export default function ManageBooking() {
  const nav = useNav()
  const t = useCopy()
  const { booked } = useStay()
  const [toast, setToast] = useState('')
  const soon = () => setToast(t('notBuilt'))

  return (
    <div className="screen funnel after">
      <div className="screen__nav"><Navbar toolbar={{ title: t('manageBooking'), onBack: () => nav.back() }} /></div>
      <div className="screen__body funnel__body">
        <BookingSummary hotel={booked.hotel} search={booked.search} />

        <div className="funnel__card after__cancel">
          <div className="after__cancel-head">
            <div>
              <h2 className="t-subtitle t-reset">{t('cancelOnline')}</h2>
              <p className="t-body t-subtext t-reset">{t('cancelOnlineSub')}</p>
            </div>
            <Tag label={t('newTag')} style="filled" />
          </div>
          <div className="after__note">
            <b className="t-body-semi">{t('notRefundable')}</b>
            <p className="t-body t-reset">{t('cancelWindowEnded', fmtFull(addDays(booked.checkIn, -1)))}</p>
          </div>
          <LegacyButton variant="secondary" label={t('contactToCancel')} onClick={soon} />
          <LegacyButton variant="link" size="small" label={t('viewCancelPolicy')} onClick={soon} />
        </div>

        <div className="funnel__card">
          <h2 className="t-subtitle t-reset">{t('preferTalk')}</h2>
          <div className="after__ref-row">
            <span className="t-body t-subtext after__ref-label">{t('almosaferId')}<Icon svg={I.info} size={16} /><b className="t-subtitle after__num">{booked.id}</b></span>
            <button type="button" className="after__link t-subtitle t-link" onClick={() => setToast(t('copied'))}>{t('copy')}</button>
          </div>
          <p className="t-caption t-subtext t-reset">{t('idNote')}</p>
          <Separator />
          <div>
            <Cell dir={t.dir} visual="icon" icon={<Icon svg={I.whatsapp} />} label={t('whatsapp')} onClick={soon} />
            <Cell dir={t.dir} visual="icon" icon={<Icon svg={I.headset} />} label={t('callSupport')} showSeparator={false} onClick={soon} />
          </div>
        </div>
      </div>
      <Snackbar message={toast} show={!!toast} onClose={() => setToast('')} />
    </div>
  )
}
