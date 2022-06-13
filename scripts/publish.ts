import { execSync } from 'child_process'
import path from 'path'
import consola from 'consola'
import { version } from '../package.json'
import { packages } from '../meta/packages'

execSync('pnpm run build', { stdio: 'inherit' })

let command = 'npm publish --access public --registry https://registry.npmjs.org'

if (version.includes('beta'))
  command += ' --tag beta'

for (const { name } of packages) {
  execSync(command, { stdio: 'inherit', cwd: path.join('packages', name, 'dist') })
  consola.success(`Published @djie/${name}`)
}
