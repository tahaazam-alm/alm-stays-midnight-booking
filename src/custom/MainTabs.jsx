// CUSTOM: not in the design system — the app's bottom tabs (DS TabBar) pinned to the foot of Home and My Trips.
// Only Home and My Trips are built; the other tabs call `onOther`.
import { TabBar } from 'design-system'
import { useNav } from '../shell/navigation.jsx'
import { Icon } from '../shell/Icon.jsx'
import { useCopy } from '../copy.js'
import * as I from '../icons.js'
import './MainTabs.css'

export function MainTabs({ value, onOther }) {
  const nav = useNav()
  const t = useCopy()
  const items = [['tabHome', I.homeFill], ['tabExplore', I.compassFill], ['tabTrips', I.calendarFill], ['tabOffers', I.discountFill], ['tabProfile', I.userFill]]
    .map(([k, svg]) => ({ label: t(k), icon: <Icon svg={svg} /> }))
  const go = (i) => { if (i === value) return; if (i === 0) nav.replace('home'); else if (i === 2) nav.replace('trips'); else onOther?.() }
  return <div className="main-tabs"><TabBar items={items} value={value} onChange={go} /></div>
}
