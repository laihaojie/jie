import { execSync } from 'child_process'
import { readJSONSync } from 'fs-extra'
import { updatePackageJSON } from './utils'

const { version: oldVersion } = readJSONSync('package.json')

// execSync('npx bumpp', { stdio: 'inherit' })

const { version } = readJSONSync('package.json')

// if (oldVersion === version) {
//   console.log('canceled')
//   process.exit()
// }

updatePackageJSON()

// execSync('npm run build', { stdio: 'inherit' })
// execSync('git add .', { stdio: 'inherit' })

// execSync(`git commit -m "chore: release v${version}"`, { stdio: 'inherit' })
// execSync(`git tag -a v${version} -m "v${version}"`, { stdio: 'inherit' })
