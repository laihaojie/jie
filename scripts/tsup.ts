import { execSync } from 'child_process'
import { packages } from '../meta/packages'

for (const { name } of packages) {
  // const command = `npx tsup packages/${name}/index.ts --dts --format cjs,esm -d packages/${name}/dist --external vue`
  const command = `npx tsup packages/${name}/index.ts --dts --format cjs,esm -d packages/${name}/dist`
  execSync(command, { stdio: 'inherit' })
}

execSync('pnpm run update', { stdio: 'inherit' })
