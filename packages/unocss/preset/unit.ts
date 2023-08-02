import type { Preset } from 'unocss'

export interface PresetUnitOptions {
  /**
   * 1rem = n px
   * @default 4
   */
  baseFontSize?: number

  /**
   * @default 'px'
   */
  unit?: 'px' | 'rpx' | 'rem' | 'em' | 'vw' | 'vh' | 'vmin' | 'vmax' | '%' | 'cm' | 'mm' | 'in' | 'pc' | 'pt' | 'ch' | 'ex'

  /**
   * @default /(-?[\.\d]+)rem/g
   */
  re?: RegExp
}

export function presetUnit(options: PresetUnitOptions = {}): Preset {
  const {
    baseFontSize = 4,
    re = /(-?[\.\d]+)rem/g,
    unit = 'px',
  } = options

  return {
    name: '@djie/unocss-preset-unit',
    postprocess: (util) => {
      util.entries.forEach((i) => {
        const value = i[1]
        if (typeof value === 'string' && re.test(value))
          i[1] = value.replace(re, (_, p1) => `${p1 * baseFontSize}${unit}`)
      })
    },
  }
}
