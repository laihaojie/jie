import { execSync } from 'node:child_process'
import process from 'node:process'
import { readJSONSync } from 'fs-extra'

const { version: oldVersion } = readJSONSync('package.json')

execSync('npx bumpp', { stdio: 'inherit' })

const { version } = readJSONSync('package.json')

if (oldVersion === version) {
  console.log('canceled')
  process.exit()
}

execSync('git add .', { stdio: 'inherit' })
execSync(`git commit -m "chore: release v${version}"`, { stdio: 'inherit' })
execSync(`git tag -a v${version} -m "v${version}"`, { stdio: 'inherit' })
execSync('git push --tags', { stdio: 'inherit' })
execSync('git push', { stdio: 'inherit' })
