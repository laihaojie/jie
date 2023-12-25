import type { Rule } from 'unocss'

export const commonRules: Rule[] = [
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
]
