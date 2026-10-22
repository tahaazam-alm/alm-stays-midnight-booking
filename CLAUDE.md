@node_modules/design-system/CLAUDE.md

# This prototype

Built on the Almosafer design system (`tajawal/design-system`) with the `almosafer-prototype` skill. Read `design.md` for when to use each component.

## Rules

- **Library first.** Use a design-system component whenever one fits. Check with the `design-system` MCP tools (`find_component`, `get_component`, `validate_props`) before building anything custom.
- **Custom parts** (anything the library lacks) go in `src/custom/`, one file per part, with a top comment `// CUSTOM: not in the design system — <why>`. Style them only with design-system tokens (`--space-*`, `--rounded-*`, `--type-*`, semantic colour tokens). No raw hex colours, no raw font sizes.
- **Ready for later languages and platforms**, even when only one is live:
  - logical CSS only: `margin-inline-start`, `padding-inline`, `inset-inline-end`, `text-align: start` — never `left`/`right`
  - all user-facing copy in `src/copy.js`, keyed by language (`en` filled, `ar` may be empty)
  - mirror directional icons (chevrons, arrows) by swapping them when `dir === 'rtl'`, never with `scaleX(-1)`
  - read `platform` / `dir` from `useProto()`; let `DesignSystemProvider` handle library components
- **Icons:** `import pin from '@ds-icons/line-icons/pin.svg?raw'` then `<Icon svg={pin} />`. Pick the icon type by intent (line / product / visual), as the design system's CLAUDE.md explains.
- **Screens** live in `src/screens/` and are registered in `src/App.jsx`. Navigate with `useNav()`.
- **Scenario toggles** (e.g. booking type) go in `prototype.config.js` → `controls`; read them with `useProto().controls`.
- `src/shell/` is prototype chrome (control bar, device frame, navigation). It's not product UI.

## Commands

- `npm run dev`: dev server
- `npm run build:handoff`: writes `handoff/<name>.html` (single file) and `handoff/<name>-react.zip`
- `npm run update-ds`: pull the latest design system
