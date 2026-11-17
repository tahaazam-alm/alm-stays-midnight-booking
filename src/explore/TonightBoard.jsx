// EXPLORATION, not product UI: the board that lays the check-in tonight variations side by side (open with #explore).
import Board from './Board.jsx'
import { Current, DatesRoll, ArrivalSwitch, DockedTag, QuietRow, QuickChip } from './TonightVariants.jsx'

const M = (id) => `https://mobbin.com/screens/${id}`
const ITEMS = [
  { id: 'A', name: 'Tint sweep', tag: 'Current', View: Current,
    idea: 'The toggle row sits under the dates. Turning it on sweeps an aqua tint over the row and the dates.',
    motion: 'Gradient colour and reach, 450ms ease-out. The highlight stays in the same place.', refs: [] },
  { id: 'B', name: 'Dates roll', View: DatesRoll,
    idea: 'No highlight. The dates themselves change: check-in becomes the tonight window, check-out rolls to today, the calendar icon turns into a moon.',
    motion: 'Old value lifts and blurs out, new one rises in. 220ms ease-out, check-out 50ms behind check-in.',
    refs: [['HotelTonight · When: Tonight', M('a90d6395-04d7-4b17-987d-e8200172424a')]] },
  { id: 'C', name: 'Arrival switch', View: ArrivalSwitch,
    idea: 'A choice between two arrivals instead of an on/off feature. Both options are always spelled out.',
    motion: 'Pill slides across, 280ms ease-in-out; label colour follows; check-out rolls.',
    refs: [['Airbnb · Dates / Flexible', M('899e2d19-2bb5-41a9-8e28-2fd2add06148')], ['Bolt Food · Delivery / Pickup', M('9895a608-cba7-4ccd-820e-6f82b521ead9')]] },
  { id: 'D', name: 'Docked tag', View: DockedTag,
    idea: 'An offer strip under the dates. Accepting it folds the strip away and the option lands inside the check-in cell, with a small x to remove it.',
    motion: 'Strip folds in 220ms; the tonight line rises into the cell from 96% scale, 100ms later. The card gets shorter.',
    refs: [['Tesla Robotaxi · strip under the field', M('37ea3ffb-8176-4040-86fe-be478bc6ea95')], ['talabat · slim offer strip', M('36fefcc9-cbb1-4309-8e9f-ed83e238c39a')]] },
  { id: 'E', name: 'Quiet row', View: QuietRow,
    idea: 'The row stays white. Only the moon fills in and one line unfolds to say what changed.',
    motion: 'Icon fill 220ms; line unfolds 280ms ease-out with a 2px blur fade; check-out rolls.',
    refs: [['Peerspace · Instant book', M('bd7fe3d0-478d-4a90-b2e5-c39cb446d3c0')], ['Marriott Bonvoy · Use Points', M('1e0b9613-5c52-4e6c-981c-d0e856546efd')]] },
  { id: 'F', name: 'Quick chip', View: QuickChip,
    idea: 'A design-system chip under the dates, like a quick date pick. Almost no motion: the chip selects and check-out rolls.',
    motion: 'Press scale 0.97, 160ms; selected colours 220ms.',
    refs: [['Tripadvisor · Tonight / Tomorrow chips', M('d7416989-bb90-46bd-ae2f-9fbafc31d698')], ['Gojek · Today / Tomorrow', M('7e7eeb2c-c5d1-48d6-8203-fae99cca927b')]] },
]

export default function TonightBoard() {
  return <Board title="Check-in tonight on the search widget" sub="Six ways to show the option. Flip each one; slow the motion down to study it." items={ITEMS} />
}
