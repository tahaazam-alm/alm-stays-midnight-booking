import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'
import { fileURLToPath } from 'node:url'

const dsIcons = fileURLToPath(new URL('./node_modules/design-system/src/icons', import.meta.url))

// HANDOFF=single → one self-contained HTML file (used by `npm run build:handoff`)
const single = process.env.HANDOFF === 'single'

export default defineConfig({
  plugins: [react(), single && viteSingleFile()].filter(Boolean),
  resolve: {
    // The design system ships its SVG icons in src/icons but doesn't export that path.
    // Import them as strings: import pin from '@ds-icons/line-icons/pin.svg?raw'
    alias: { '@ds-icons': dsIcons },
  },
  base: './',
  build: {
    outDir: single ? 'handoff/.single' : 'dist',
    assetsInlineLimit: single ? 100_000_000 : 4096,
  },
})
