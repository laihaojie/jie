import fs from 'fs-extra'
import { join, resolve } from 'path'
import { packages } from '../meta/packages'

export const DIR_ROOT = resolve(__dirname, '..')
export const DIR_SRC = resolve(__dirname, '../packages')
const DIR_TYPES = resolve(__dirname, '../types/packages')

export async function updateImport() {
  for (const { name, description } of packages) {
    const imports = []
    const dir = ''

    await fs.writeFile(join(dir, 'index.ts'), `${imports.join('\n')}\n`)
  }
}


export async function updatePackageJSON() {
  const { version } = await fs.readJSON('package.json')

  for (const { name, description } of packages) {
    const packageDir = join(DIR_SRC, name)
    const packageJSONPath = join(packageDir, 'package.json')
    const packageJSON = await fs.readJSON(packageJSONPath)

    packageJSON.version = version
    packageJSON.description = description || packageJSON.description
    packageJSON.author = 'laihaojie <https://github.com/laihaojie>'
    packageJSON.bugs = {
      url: 'https://github.com/vueuse/vueuse/issues',
    }
    packageJSON.homepage = name === 'core'
      ? 'https://github.com/vueuse/vueuse#readme'
      : `https://github.com/vueuse/vueuse/tree/main/packages/${name}#readme`
    packageJSON.repository = {
      type: 'git',
      url: 'git+https://github.com/vueuse/vueuse.git',
      directory: `packages/${name}`,
    }
    packageJSON.main = './index.cjs'
    packageJSON.types = './index.d.ts'
    packageJSON.module = './index.mjs'
    packageJSON.exports = {
      '.': {
        import: './index.mjs',
        require: './index.cjs',
        types: './index.d.ts',
      },
      './*': './*',
      ...packageJSON.exports,
    }

    await fs.writeJSON(packageJSONPath, packageJSON, { spaces: 2 })
  }
}
