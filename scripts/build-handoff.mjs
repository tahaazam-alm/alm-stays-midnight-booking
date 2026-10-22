// npm run build:handoff
// Produces everything the handoff tool accepts, in ./handoff:
//   <name>.html        one self-contained file (JS, CSS, images inlined) — open or upload anywhere
//   <name>-react.zip   the React project source + a prebuilt dist/ (no node_modules)
import { execSync } from 'node:child_process'
import { copyFileSync, mkdirSync, readFileSync, rmSync, statSync } from 'node:fs'

const run = (cmd, env = {}) => execSync(cmd, { stdio: 'inherit', env: { ...process.env, ...env } })
const { name } = JSON.parse(readFileSync('package.json', 'utf8'))
const kb = (f) => `${Math.round(statSync(f).size / 1024)} KB`

rmSync('handoff', { recursive: true, force: true })
mkdirSync('handoff')

console.log('\n→ Single HTML file')
run('npx vite build', { HANDOFF: 'single' })
copyFileSync('handoff/.single/index.html', `handoff/${name}.html`)
rmSync('handoff/.single', { recursive: true, force: true })

console.log('\n→ React build + source zip')
run('npx vite build')
run(`zip -qr handoff/${name}-react.zip . -x "node_modules/*" "handoff/*" ".git/*" ".mcp.json" ".DS_Store"`)

console.log(`\nHandoff files ready:
  handoff/${name}.html       (${kb(`handoff/${name}.html`)})
  handoff/${name}-react.zip  (${kb(`handoff/${name}-react.zip`)})`)
