import type { OutputOptions, Plugin, RollupOptions } from 'rollup'
import { packages } from "../meta/packages"
import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'
import vueJsx from '@vitejs/plugin-vue-jsx'

const configs: RollupOptions[] = []

const dtsPlugin = [
  dts(),
]

for (const { name, mjs, cjs, dts, external } of packages) {
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
      file: `packages/${name}/dist/index.cjs`,
      format: 'cjs',
    })
  }


  configs.push({
    input,
    output,
    plugins: [
      ...name == 'jie-ui' ? [
        vueJsx()
      ] : [],
      esbuild(),
    ],
    external: [
      ...(external || []),
    ],
  })

  if (dts !== false) {
    configs.push({
      input,
      output: {
        file: `packages/${name}/dist/index.d.ts`,
        format: 'es',
      },
      plugins: dtsPlugin,
      external: [
        ...(external || []),
      ],
    })
  }


}

export default configs