import type { Preset } from '@unocss/core'

export interface PresetUnitOptions {
  /**
   * 1rem = n px
   * @default 4
   */
  // baseFontSize?: number

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
    re = /(-?[\.\d]+)rem/g,
    unit = 'px',
  } = options

  return {
    name: '@djie/unocss-preset-unit',
    postprocess: (util) => {
      util.entries.forEach((i) => {
        const value = i[1]
        if (typeof value === 'string' && re.test(value)) {
          const origin = util.selector.match(/[\.\d]+/)?.filter(d => d !== '.')[0]
          if (origin !== null && origin !== undefined)
            i[1] = value.replace(re, () => `${origin}${unit}`)
        }
      })
    },
  }
}
