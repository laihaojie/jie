import { execSync } from 'child_process'

const package_name = 'utils'

const commands = [
  `npx tsup packages/${package_name}/src/index.ts --dts --format cjs,esm,iife -d packages/${package_name}/dist`,
]

for (const command of commands)
  execSync(command, { stdio: 'inherit' })