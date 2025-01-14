import { join, resolve } from 'node:path'
import fs from 'fs-extra'
import { packages } from '../meta/packages'

export const DIR_ROOT = resolve(__dirname, '..')
export const DIR_SRC = resolve(__dirname, '../packages')
// const DIR_TYPES = resolve(__dirname, '../types/packages')

// export async function updateImport() {
//   for (const { name, description } of packages) {
//     const imports = []
//     const dir = ''

//     await fs.writeFile(join(dir, 'index.ts'), `${imports.join('\n')}\n`)
//   }
// }

export async function updatePackageJSON() {
  const { version } = await fs.readJSON('package.json')

  // eslint-disable-next-line unused-imports/no-unused-vars
  for (const { name, description, cjs, mjs } of packages) {
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
    // if (cjs !== false)
    //   packageJSON.main = './index.cjs'

    // if (mjs !== false)
    //   packageJSON.module = './index.mjs'

    packageJSON.types = './index.d.ts'
    packageJSON.exports = {
      '.': {
        import: './index.mjs',
        ...cjs !== false ? { require: './index.js' } : {},
        types: './index.d.ts',
      },
      './*': './*',
      ...packageJSON.exports,
    }
    if (packageJSON.dependencies) {
      packageJSON.dependencies = Object.fromEntries(Object.entries(packageJSON.dependencies).map(([key, value]) => {
        if (typeof value === 'string' && value.includes('workspace:')) {
          return [key, version]
        }
        else {
          return [key, value]
        }
      }))
    }
    delete packageJSON.scripts
    delete packageJSON.devDependencies

    await fs.writeJSON(join(packageDir, 'dist', 'package.json'), packageJSON, { spaces: 2 })
  }
}

export async function updateFileExtension() {
  const { type } = await fs.readJSON('package.json')

  for (const { name } of packages) {
    const packageDir = join(DIR_SRC, name)
    const packageDistDir = join(packageDir, 'dist')

    if (type === 'module') {
      fs.access(join(packageDistDir, 'index.js'), async (e) => {
        !e && fs.renameSync(join(packageDistDir, 'index.js'), join(packageDistDir, 'index.mjs'))
      })
    }
    // if (type === 'commonjs' || type === undefined) {
    //   fs.access(join(packageDistDir, 'index.js'), async (e) => {
    //     !e && fs.renameSync(join(packageDistDir, 'index.js'), join(packageDistDir, 'index.cjs'))
    //   })
    // }
  }
}
