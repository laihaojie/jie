import type { InputPluginOption, OutputOptions, RollupOptions } from 'rollup'
import Path from 'node:path'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Copy from 'rollup-plugin-copy'
import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'
import { packages } from '../meta/packages'

const configs: RollupOptions[] = []

const dtsPlugin = [
  dts({
    compilerOptions: {
      preserveSymlinks: false,
    },
  }),
] as InputPluginOption[]

for (const { name, mjs, cjs, dts, tsx, external = [], copy } of packages) {
  const input = `packages/${name}/index.ts`
  const output: OutputOptions[] = []

  if (mjs !== false) {
    output.push({
      file: `packages/${name}/dist/index.mjs`,
      format: 'es',
    })
  }

  if (cjs !== false) {
    output.push({
      file: `packages/${name}/dist/index.js`,
      format: 'cjs',
    })
  }
  const plugins = [
    esbuild(),
  ] as InputPluginOption[]
  if (tsx) {
    plugins.push(vueJsx() as InputPluginOption)
  }
  if (copy) {
    plugins.push(Copy({
      verbose: true,
      targets: [
        ...copy.map((i) => {
          const dir = Path.extname(i) === ''
          if (dir) {
            return {
              src: `packages/${name}/${i}`,
              dest: `packages/${name}/dist/${i.split('/').filter((c) => {
                return /\w+/.test(c)
              }).join('/')}`,
            }
          }
          else {
            return ({
              src: `packages/${name}/${i}`,
              dest: `packages/${name}/dist`,
            })
          }
        }),
      ],
    }))
  }
  configs.push({
    input,
    output,
    plugins,
    external,
  })

  if (dts !== false) {
    configs.push({
      input,
      output: {
        file: `packages/${name}/dist/index.d.ts`,
        format: 'es',
      },
      plugins: dtsPlugin,
      external,
    })
  }
}

export default configs
