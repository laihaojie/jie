import { defineConfig, transformerDirectives, transformerVariantGroup } from 'unocss'
import { presetWeb } from './preset/web'

export default defineConfig({
  content: {
    pipeline: {
      include: [
        './**/*.ts',
      ],
    },
  },
  shortcuts: [
    ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600'],
    ['fc', 'flex items-center justify-center'],
  ],
  presets: [
    presetWeb({ unit: 'px' }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
