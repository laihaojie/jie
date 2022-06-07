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
      url: 'https://github.com/laihaojie/jie/issues',
    }
    packageJSON.homepage = 'https://github.com/laihaojie/jie.git#readme'

    packageJSON.repository = {
      type: 'git',
      url: 'git+https://github.com/laihaojie/jie.git',
      directory: `packages/${name}`,
    }
    packageJSON.main = './index.cjs'
    packageJSON.types = './index.d.ts'
    packageJSON.module = './index.js'
    packageJSON.exports = {
      '.': {
        import: './index.js',
        require: './index.cjs',
        types: './index.d.ts',
      },
      './*': './*',
      ...packageJSON.exports,
    }
    delete packageJSON.scripts
    delete packageJSON.devDependencies

    await fs.writeJSON(join(packageDir, "dist", "package.json"), packageJSON, { spaces: 2 })
  }
}


export async function updateFileExtension() {

  const { type } = await fs.readJSON('package.json')

  for (const { name } of packages) {
    const packageDir = join(DIR_SRC, name)
    const packageDistDir = join(packageDir, 'dist')

    if (type === "module") {
      fs.renameSync(join(packageDistDir, 'index.js'), join(packageDistDir, 'index.mjs'))
    }
    if (type === "commonjs" || type === undefined) {
      fs.renameSync(join(packageDistDir, 'index.js'), join(packageDistDir, 'index.cjs'))
    }
  }
}
