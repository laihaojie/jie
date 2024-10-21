import { execSync } from 'node:child_process'
import path from 'node:path'
import consola from 'consola'
import { packages } from '../meta/packages'
import { version } from '../package.json'

execSync('pnpm run build', { stdio: 'inherit' })

let command = 'pnpm publish --access public --no-git-checks --registry https://registry.npmjs.org'

if (version.includes('beta'))
  command += ' --tag beta'

for (const { name } of packages) {
  execSync(command, { stdio: 'inherit', cwd: path.join('packages', name, 'dist') })
  consola.success(`Published @djie/${name}`)
}
