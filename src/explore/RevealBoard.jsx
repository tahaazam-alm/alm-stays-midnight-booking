// EXPLORATION, not product UI: check-in tonight is not on the widget at first; these are ways for it to arrive (open with #reveal).
import Board from './Board.jsx'
import { Unfold, TuckedTab, CellWhisper, PointerTip, CalendarFooter, CalendarTip, PlainShimmer, CellShimmer, BandShimmer } from './RevealVariants.jsx'

const M = (id) => `https://mobbin.com/screens/${id}`
const ITEMS = [
  { id: 'A', name: 'Unfold', tag: 'After load', View: Unfold, replay: true,
    idea: 'The widget loads as the plain form. A moment later the tinted row opens under the dates and the card grows.',
    motion: 'Waits 700ms, then the height opens in 280ms ease-out while the row settles 6px down and sharpens from a 2px blur.',
    refs: [['Expedia · option under the form', M('cb562cb0-9354-4a93-9b73-fd849d69d9c2')]] },
  { id: 'B', name: 'Tucked tab', tag: 'After load', View: TuckedTab, replay: true,
    idea: 'A tab slides out from under the card. Nothing inside the card moves, so a tap that was already on its way still lands.',
    motion: 'Waits 700ms, then slides down by its own height from behind the card, 280ms ease-out. Transform only.',
    refs: [['talabat · slim strip attached to the field', M('36fefcc9-cbb1-4309-8e9f-ed83e238c39a')]] },
  { id: 'C', name: 'Cell whisper', tag: 'After load', View: CellWhisper, replay: true,
    idea: 'No new row. One small line, "Arriving tonight?", appears inside the check-in cell. Tapping it rolls the cell to tonight.',
    motion: 'Waits 700ms; the line rises 4px and fades in, 220ms. On tap the label, icon and line roll; check-out follows 50ms later.',
    refs: [['HotelTonight · When: Tonight', M('a90d6395-04d7-4b17-987d-e8200172424a')]] },
  { id: 'D', name: 'Pointer tip', tag: 'After load', View: PointerTip, replay: true,
    idea: 'A tooltip pops out of the check-in cell and sits over the card. The loudest of the four; the card itself never changes size.',
    motion: 'Waits 700ms, then grows from 96% out of its caret with a 4px drop, 220ms ease-out.',
    refs: [['Trainline · option tied to the date', M('283eef0d-267d-44a6-943f-462865de0c08')]] },
  { id: 'E', name: 'Calendar footer', tag: 'From the calendar', View: CalendarFooter, tall: true,
    idea: 'Nothing on the widget. Tap the dates, then tap 16: the tinted row rises in the calendar footer. Confirm, and the row lands on the widget too.',
    motion: 'Footer row unfolds in 280ms. Back on the widget the same row opens 180ms after the sheet starts to leave.',
    refs: [['Airbnb · options row under the calendar', M('23a742f2-3a7f-4a72-81de-a7b1db81e339')], ['Trainline · toggle in the calendar footer', M('283eef0d-267d-44a6-943f-462865de0c08')], ['Partiful · row added under the calendar', M('afc941d6-04aa-4387-82bf-fe7e36c34c7e')]] },
  { id: 'F', name: 'Date tip', tag: 'From the calendar', View: CalendarTip, tall: true,
    idea: 'Same trigger, but the option pops on the date itself, right where the tap happened. Confirm, and the row lands on the widget.',
    motion: 'Tip grows from 96% out of the date, 220ms ease-out. The footer stays still.',
    refs: [['Lightyear · note tied to the picked date', M('35287218-c4f4-4799-ac17-c6a0e6298d3a')]] },
  { id: 'G', name: 'Plain shimmer', tag: 'After load', View: PlainShimmer, replay: true,
    idea: 'Like A, but quieter: the row opens a second after load on a plain white background, and a wave of aqua runs through its title letter by letter, to the end and back.',
    motion: 'Waits 1s, the row unfolds in 280ms, then each letter turns aqua for 360ms, 26ms after the one before. The wave takes about 1.1s each way and does not repeat.',
    refs: [['Base · wave through the code digits', M('7d56cd42-327a-4ab4-8143-79ad420b791b')]] },
  { id: 'H', name: 'Blob shimmer', tag: 'After load', View: CellShimmer, replay: true,
    idea: 'Like G, but the light is on the row, not the words: the plain row opens a second after load, and one soft blob of aqua light drifts across it as it opens.',
    motion: 'Waits 1s, then the card grows in 560ms, easing in and out. A small round aqua glow starts 260ms in, glides across the row in one eased pass and fades out at the far edge, 1.25s in all. Once.',
    refs: [['Framer · Linear shimmer effect', 'https://dribbble.com/shots/20775224-Linear-Shimmer-Effect-in-Framer']] },
  { id: 'I', name: 'Band shimmer', tag: 'After load', View: BandShimmer, replay: true, toggle: { label: 'Reveal', prop: 'reveal' },
    idea: 'H with a plain shimmer: the same reveal, but the light is a straight soft band of aqua that sweeps the row from edge to edge. Turn Reveal off to see the row on the widget from the start, with only the shimmer.',
    motion: 'Waits 1s, then the card grows in 560ms, easing in and out. The band starts 260ms in, crosses the row in one eased pass, 1.1s in all. It starts faint (30%), reaches full strength by the middle, holds it towards the end and fades out at the far edge. Once. With Reveal off nothing opens; the band alone plays 1.26s after load.', refs: [] },
]

export default function RevealBoard() {
  return <Board title="Check-in tonight arrives later" resetLabel="Replay all"
    sub="The option is not on the widget at first. A to D and G to I bring it in after the page loads; E and F only once tonight's date is picked in the calendar." items={ITEMS} />
}
