import { execSync } from 'child_process'
import { packages } from "../meta/packages"
import { updatePackageJSON } from './utils'


for (const { name, description } of packages) {
  const command = `npx tsup packages/${name}/index.ts --dts --format cjs,esm,iife -d packages/${name}/dist`
  execSync(command, { stdio: 'inherit' })
  
}

updatePackageJSON()
