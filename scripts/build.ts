import { execSync } from 'child_process'

const package_name = 'utils'

const packages = [
  "utils",
  "ws",
]



for (const name of packages) {
  const command = `npx tsup packages/${name}/index.ts --dts --format cjs,esm,iife -d packages/${name}/dist`
  execSync(command, { stdio: 'inherit' })
}
