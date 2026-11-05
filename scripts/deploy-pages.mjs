// Publishes the single-file build to the gh-pages branch (served by GitHub Pages).
// Run `npm run deploy` — it rebuilds handoff/midnight-booking.html first.
import { execSync } from 'node:child_process'
import { mkdtempSync, copyFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const run = (cmd, cwd) => execSync(cmd, { cwd, stdio: 'inherit' })
const remote = execSync('git remote get-url origin').toString().trim()
const dir = mkdtempSync(join(tmpdir(), 'pages-'))
copyFileSync('handoff/midnight-booking.html', join(dir, 'index.html'))
writeFileSync(join(dir, '.nojekyll'), '')
run('git init -q -b gh-pages', dir)
run('git add -A', dir)
run(`git -c user.name="$(git -C "${process.cwd()}" config user.name)" -c user.email="$(git -C "${process.cwd()}" config user.email)" commit -qm "Deploy ${new Date().toISOString()}"`, dir)
run(`git push -qf ${remote} gh-pages`, dir)
console.log('Deployed to gh-pages')
