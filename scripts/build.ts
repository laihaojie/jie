import { execSync } from 'child_process'

const commands = [
  'npx tsup packages/utils/src/index.ts --dts --format cjs,esm,iife -d packages/utils/dist',
]

for (const command of commands)
  execSync(command, { stdio: 'inherit' })