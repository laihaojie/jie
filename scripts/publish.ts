import { execSync } from 'child_process'
import path from 'path'
import consola from 'consola'
import { version } from '../package.json'
import { packages } from '../meta/packages'


const ci = process.argv[2]

!ci && execSync('npm run build', { stdio: 'inherit' })

!ci && execSync("nrm use npm", { stdio: 'inherit' })

let command = 'npm publish --access public'

if (version.includes('beta'))
  command += ' --tag beta'


for (const { name } of packages) {
  execSync(command, { stdio: 'inherit', cwd: path.join('packages', name, 'dist') })
  consola.success(`Published @djie/${name}`)
}

!ci && execSync("nrm use tb", { stdio: 'inherit' })