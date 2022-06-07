import { execSync } from 'child_process'
import path from 'path'
import consola from 'consola'
import { version } from '../package.json'
import { packages } from '../meta/packages'


const release = process.argv[2]

!release && execSync('npm run build', { stdio: 'inherit' })

let command = 'npm publish --access public'

if (version.includes('beta'))
  command += ' --tag beta'

execSync("nrm use npm", { stdio: 'inherit' })

for (const { name } of packages) {
  execSync(command, { stdio: 'inherit', cwd: path.join('packages', name, 'dist') })
  consola.success(`Published @djie/${name}`)
}

execSync("nrm use tb", { stdio: 'inherit' })