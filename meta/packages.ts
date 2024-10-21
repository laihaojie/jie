interface PackageManifest {
  name: string
  description?: string
  mjs?: boolean
  cjs?: boolean
  dts?: boolean
  tsx?: boolean
  external?: string[]
  copy?: string[]
}

export const packages: PackageManifest[] = [
  {
    name: 'utils',
    description: 'The utils of djie',
    external: ['node:os'],
  },
  {
    name: 'ws',
    description: 'The ws of djie',
    cjs: false,
  },
  {
    name: 'jie-ui',
    description: 'The jie-ui of djie',
    external: ['vue'],
    cjs: false,
    tsx: true,
  },
  {
    name: 'devcode',
    description: 'The devcode of djie',
  },
  {
    name: 'unocss',
    description: 'unocss preset',
    external: ['@djie/utils', 'unocss', '@iconify/utils'],
    copy: ['reset.css', 'reset-full.css', 'css/**/*'],
  },
]
