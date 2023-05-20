import presetRemToPx from '@unocss/preset-rem-to-px'
import type { Preset } from 'unocss'
import { presetAttributify, presetIcons, presetTypography, presetUno, presetWebFonts } from 'unocss'

export interface PresetJieOptions {
  useRemToPx?: boolean
}

export function presetJie(options: PresetJieOptions = {}): Preset {
  return {
    name: 'preset-jie',
    presets: [
      presetUno(),
      presetAttributify(),
      presetIcons({
        scale: 1.2,
        warn: true,
      }),
      presetTypography(),
      presetWebFonts({
        fonts: {
          sans: 'DM Sans',
          serif: 'DM Serif Display',
          mono: 'DM Mono',
        },
      }),
      ...options.useRemToPx ? [presetRemToPx({ baseFontSize: 4 }) as Preset] : [],
    ],
    shortcuts: [
      ['btn', 'px-4 py-1 rounded inline-block bg-teal-700 text-white cursor-pointer !outline-none hover:bg-teal-800 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
      ['icon-btn', 'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600'],
      ['fc', 'flex justify-center items-center'],
      ['wrap', 'w1280 m-auto my0'],
      ['cc', 'absolute top-0 left-0 right-0 bottom-0 m-auto'],
      ['bc', 'b-b-1  b-#7AAAF5'],
      [/^dian-?([\.\d]+)?$/, ([, c]) => `relative h${c ?? '21'} mr-20 fl before:cc before:w6px before:block before:content-[""] before:h6px before:b-3px before:b-#005CEC before:rounded-3px`],
      ['cf', 'before:content-[""] after:content-[""] before:table after:table after:clear-both after:hidden [zoom:1]'],
      ['fl', 'float-left'],
      ['fr', 'float-right'],
      ['cp', 'cursor-pointer'],
      ['th', 'hover:c-#DA2027 cp'],
      [/^scale-?([\.\d]+)?$/, ([, c = '1.1']) => `hover:transform-scale-${c} transition-0.5`],
      ['bd', '!c-#005CEC !b-#005CEC  !hover:bg-#005CEC !hover:c-white !focus:bg-#005CEC !focus:c-white'],
      [/^text-line-?([\.\d]+)?$/, ([, c = '1']) => {
        if (c === '1')
          return 'overflow-hidden ws-nowrap text-ellipsis'
        else
          return `line-clamp-${c}`
      }],
    ],
    rules: [
      [/^tc-?([\.\d]+)?$/, ([_, num]) => ({ 'text-align': 'center', 'line-height': num ? `${num}px` : 'normal' })],
      [/^tl-?([\.\d]+)?$/, ([_, num]) => ({ 'text-align': 'left', 'line-height': num ? `${num}px` : 'normal' })],
      [/transform-scale-?([\.\d]+)?/, ([_, num = '1.1']) => ({
        '-webkit-transform': `scale(${num})`,
        '-moz-transform': `scale(${num})`,
        '-ms-transform': `scale(${num})`,
        'transform': `scale(${num})`,
      })],
      [/transition-?([\.\d]+)?/, ([_, num = '1']) => ({
        '-webkit-transition': `all ${num}s`,
        '-moz-transition': `all ${num}s`,
        'transition': `all ${num}s`,
      })],
    ],
    safelist: 'prose m-auto text-left'.split(' '),
  }
}
